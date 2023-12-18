let currentModel = undefined;
let currentSampler = undefined;

module.exports.getCurrentSampler = () => { return currentSampler };

module.exports.setCurrentSampler = async (sampler) => {
    currentSampler = sampler;
}

module.exports.getCurrentModel = () => { return currentModel };

module.exports.setCurrentModel = async (model) => {
    currentModel = model;
}