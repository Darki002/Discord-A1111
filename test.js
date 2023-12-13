const express = require('express'); 
const axios = require('axios');
const fs = require('fs');

const app = express();

const url = 'http://127.0.0.1:7860';

app.get('/', async (req, res) => {

    const respons = await axios.get(url + '/sdapi/v1/sd-models');

    const models = respons.data.map(model => model.title)
    .map(model => `<a href="/${model}">${model.split(' ')[0]}</a>`)
    .join('<br>');

    res.send(models);
});

app.get('/:model', async (req, res) => {

    const model = req.params.model;

    const payload = {
        "prompt": "beatiful women with black hair and blue eyes",
        "steps": 25,
        "batch_size": 1,
        "width": 512,
        "height": 512,
        "sampler_index": "Euler",
        "cfg_scale" : 7,
        "hr_checkpoint_name" : "dreamshaper_8.safetensors"

    }

    const override_settings = {
        "sd_model_checkpoint" : model
    }
    
    payload['override_settings'] = override_settings

    try {
        const image = await startImageGeneration(payload);
        res.send(`<img src="data:image/png;base64,${image}" />`);
    }
    catch(err) {
        res.send(err);
    }
});

async function startImageGeneration(payload) {
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
        return base64Image;
    } catch (err) {
        console.log(err);
        return null;
    }
}

app.listen(3000, () => console.log('Server ready on http://localhost:3000'));