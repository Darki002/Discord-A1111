const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getModels, createPayload, startImageGeneration } = require('./dream.js');

let currentModel = undefined;

module.exports.getCurrentModel = () => {return currentModel};

module.exports.setCurrentModel = async (interaction) => {
    if (interaction.customId === 'dreamstype') {
        currentModel = interaction.values[0];
        await interaction.reply(`Selected dream: ${currentModel}`)
    }
}

module.exports.handleDreamCommand = async (interaction) => {
    await interaction.deferReply();

    if (currentModel === undefined) {
        await interaction.editReply('You need to select a dream first!');
        return;
    }

    const prompt = interaction.options.getString('prompt');

    if (prompt === null) {
        await interaction.editReply('You need to specify a prompt!');
        return;
    }

    await interaction.editReply('Darki is dreaming...');

    try {
        const payload = createPayload(currentModel, prompt);
        const img = await startImageGeneration(payload);

        const imagheAttachment = {
            attachment: img,
            name: 'dream.png'
        }

        await interaction.editReply({ content: 'Darki has dreamed:', files: [imagheAttachment] });
    }
    catch (err) {
        console.log(err);
        await interaction.editReply('Darki is having a nightmare!');
    }
}

module.exports.handleDreamTypesCommand = async (interaction) => {
    await interaction.deferReply();
    await interaction.editReply('Dreams are coming soon!');

    const modelOption = interaction.options.getString('model');

    if (modelOption !== null) {
        const models = await getModels();
        const model = models.find(model => model === modelOption);

        if (model === undefined) {
            await interaction.editReply('This dream does not exist!');
            return;
        }

        currentModel = model;
        await interaction.editReply(`Selected dream: ${model}`);
        return;
    }

    try {
        const row = await getModelActionRow()
        await interaction.editReply({ content: 'What dream type do you want?!', components: [row] });
    }
    catch (err) {
        console.log(err);
        await interaction.editReply('Darki is having a nightmare!');
    }
}

async function getModelActionRow() {
    const models = await getModels();
    const modelsMap = models.map(model => {
        return {
            label: model,
            value: model
        }
    })

    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('dreamstype')
                .setPlaceholder('Select a dream type')
                .addOptions(modelsMap)
        );
}