const axios = require('axios');
const url = 'http://127.0.0.1:7860';

module.exports.getModels = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const respons = await axios.get(url + '/sdapi/v1/sd-models');
            const models = respons.data.map(model => model.title)
            resolve(models);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

module.exports.createPayload = (sd_model_checkpoint, prompt) => {
    const payload = ({
        prompt: prompt,
        steps: 25,
        batch_size: 1,
        width: 512,
        height: 512,
        sampler_index: "Euler",
        cfg_scale: 7
    })

    const override_settings = {
        "sd_model_checkpoint": sd_model_checkpoint
    }
    payload['override_settings'] = override_settings

    return payload;
}

module.exports.startImageGeneration = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url + '/sdapi/v1/txt2img', payload);
            const img = loadImage(response.data);
            resolve(img);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

function loadImage(response) {
    try {
        const base64Image = response['images'][0].split(';base64,').pop();
        return Buffer.from(base64Image, 'base64');
    } catch (err) {
        console.log(err);
        return null;
    }
}