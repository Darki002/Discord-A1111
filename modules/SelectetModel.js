let currentModel = undefined;

module.exports.getCurrentModel = () => {return currentModel};

module.exports.setCurrentModel = async (model) => {
    currentModel = model;
}