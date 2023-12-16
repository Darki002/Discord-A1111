const {SlashCommandBuilder, AttachmentBuilder} = require('discord.js');
const { createPayload, startImageGeneration } = require('../modules/generateImage');
const { getCurrentModel } = require('../modules/SelectetModel');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('dream')
    .setDescription('Generates an Image from the selected Model')
    .addStringOption(option =>
        option.setName('prompt')
            .setDescription('The Prompt for the Image')
            .setRequired(true)),

    async execute(interaction) {
        await interaction.deferReply();

        const currentModel = await getCurrentModel();
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
            const imgBuffer = await startImageGeneration(payload);

            const imagheAttachment = new AttachmentBuilder(imgBuffer, { name: 'dream.png'});
            await interaction.editReply({ content: 'Darki has dreamed:', files: [imagheAttachment] });
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
}