const fs = require('fs');

module.exports.getCurrentSamplerForUser = async (user) => {
    const setiings = await getUserSettings(user);
    return setiings.Sampler;
};

module.exports.setCurrentSamplerForUser = async (sampler, user) => {
    await setUserSettings(user, null, sampler);
}

module.exports.getCurrentModelForUser = async (user) => {
    const setiings = await getUserSettings(user);
    return setiings.Model;
};

module.exports.setCurrentModelForUser = async (model, user) => {
    await setUserSettings(user, model, null);
}

async function getUserSettings(user) {
    return new Promise((resolve, reject) => {
        fs.readFile('./UserSettings.json', (err, data) => {
            if (err) reject(err);
            const userSettings = JSON.parse(data);
            const result = userSettings.find(entry => entry.UserId === user.id);
            resolve(result);
        });
    });
}

async function setUserSettings(user, model, sampler) {
    return new Promise((resolve, reject) => {
        fs.readFile('./UserSettings.json', (err, data) => {
            if (err) reject(err);
            const userSettings = JSON.parse(data);
            const existingSettings = userSettings.find(entry => entry.UserId === user.id);
            if (existingSettings) {
                existingSettings.Sampler = sampler ?? existingSettings.Sampler;
                existingSettings.Model = model ?? existingSettings.Model;
            } else {
                userSettings.push({ UserId: user.id, Model: model, Sampler: sampler });
            }
            fs.writeFile('./UserSettings.json', JSON.stringify(userSettings), (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
}