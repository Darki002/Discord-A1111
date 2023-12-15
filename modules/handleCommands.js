const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { getModels, createPayload, startImageGeneration } = require('./dream.js');

module.exports.handleDreamCommand = async (interaction, currentModel) => {
    await interaction.deferReply();

    if (currentModel === undefined) {
        await interaction.editReply('You need to select a dream first!');
        return;
    }

    await interaction.editReply('Darki is dreaming...');

    try {
        const payload = createPayload(currentModel);
        const base64Image = await startImageGeneration(payload);

        await interaction.editReply({ content: 'Darki has dreamed:', files: [base64Image] });
    }
    catch (err) {
        console.log(err);
        await interaction.editReply('Darki is having a nightmare!');
    }
}

module.exports.handleDreamTypesCommand = async (interaction) => {
    await interaction.deferReply();
    await interaction.editReply('Dreams are coming soon!');

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
    const modelsMap = models.map(model => model.title)

    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('dreamstype')
                .setPlaceholder('Select a dream type')
                .addOptions(modelsMap)
        );
}