const fs = require('fs');
const path = require('path');

const file = './db/UserSettings.json';
function getFilePath() {
    return path.join(__dirname, file);
}

module.exports.getCurrentSamplerForUser = async (user) => {
    try {
        const setiings = await getUserSettings(user);
        if (setiings == null) return undefined;
        return setiings.Sampler;
    }
    catch (err) {
        throw err;
    }
};

module.exports.setCurrentSamplerForUser = async (sampler, user) => {
    try {
        await setUserSettings(user, null, sampler);
    }
    catch (err) {
        throw err;
    }
}

module.exports.getCurrentModelForUser = async (user) => {
    try {
        const setiings = await getUserSettings(user);
        if (setiings == null) return undefined;
        return setiings.Model;
    }
    catch (err) {
        throw err;
    }
};

module.exports.setCurrentModelForUser = async (model, user) => {
    try {
        await setUserSettings(user, model, null);
    }
    catch (err) {
        throw err;
    }
}

async function getUserSettings(user) {
    return new Promise((resolve, reject) => {
        fs.readFile(getFilePath(), (err, data) => {
            if (err) reject(err);
            if (!data) resolve(null);
            const userSettings = JSON.parse(data);
            const result = userSettings.find(entry => entry.UserId === user.id);
            resolve(result);
        });
    });
}

async function setUserSettings(user, model, sampler) {
    return new Promise((resolve, reject) => {

        const filePath = getFilePath();

        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            const userSettings = JSON.parse(data);
            const existingSettings = userSettings.find(entry => entry.UserId === user.id);
            if (existingSettings) {
                existingSettings.Sampler = sampler ?? existingSettings.Sampler;
                existingSettings.Model = model ?? existingSettings.Model;
            } else {
                userSettings.push({ UserId: user.id, UserName: user.username, Model: model, Sampler: sampler });
            }
            fs.writeFile(filePath, JSON.stringify(userSettings), (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    });
}