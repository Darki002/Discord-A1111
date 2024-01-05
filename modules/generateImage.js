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
}

module.exports.getSamplers = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const respons = await axios.get(url + '/sdapi/v1/samplers');
            const samplers = respons.data.map(sampler => sampler.name)
            resolve(samplers);
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
}

module.exports.startImageGeneration = async (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(url + '/sdapi/v1/txt2img', payload);
            const img = loadImage(response.data);
            resolve(img);
        } catch (err) {
            reject(err);
        }
    });
}

function loadImage(response) {
    try {
        const base64Image = response['images'][0].split(';base64,').pop();
        return Buffer.from(base64Image, 'base64');
    } catch (err) {
        return null;
    }
}

module.exports.createPayload = (
    sd_model_checkpoint, sampler, prompt, negatives, width, height, steps, cfg_scale, clipSkip, seed
) => {
    const parsedWidth = parseInt(width);
    const parsedHeight = parseInt(height);
    const parsedSteps = parseInt(steps);
    const parsedCfgScale = parseInt(cfg_scale);
    const parsedClipSkip = parseInt(clipSkip);
    const parsedSeed = parseInt(seed);

    const samplingMethode = sampler ? sampler.toString() : 'Euler';

    const payload = ({
        prompt: getString(prompt),
        negative_prompt: getString(negatives),
        steps: isNaN(parsedSteps) ? 20 : parsedSteps,
        batch_size: 1,
        width: isNaN(parsedWidth) ? 512 : parsedWidth,
        height: isNaN(parsedHeight) ? 512 : parsedHeight,
        sampler_name: samplingMethode,
        sampler_index: samplingMethode,
        cfg_scale: isNaN(parsedCfgScale) ? 7 : parsedCfgScale,
        seed: isNaN(parsedSeed) ? -1 : parsedSeed
    })

    const override_settings = {
        sd_model_checkpoint: sd_model_checkpoint.toString(),
        CLIP_stop_at_last_layers: isNaN(parsedClipSkip) ? 1 : parsedClipSkip
    }
    payload['override_settings'] = override_settings

    return payload;
}

function getString(input) {
    return input ? input.toString() : '';
}