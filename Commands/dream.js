const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createPayload, startImageGeneration } = require('../modules/generateImage');
const { getCurrentModel } = require('../modules/SelectetModel');

let isAlreadyRunning = false;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dream')
        .setDescription('Generates an Image from the selected Model')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The Prompt for the Image')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('negatives')
                .setDescription('The negative Prompt for the Image')
                .setRequired(false)),

    async execute(interaction) {

        if (isAlreadyRunning) {
            await interaction.reply('Darki is already dreaming! Please wait until he wakes up!');
            return;
        }

        isAlreadyRunning = true;

        await interaction.deferReply();

        const currentModel = await getCurrentModel();
        if (currentModel === undefined) {
            await interaction.editReply('You need to select a dream first!');
            return;
        }

        const prompt = interaction.options.getString('prompt');
        const negatives = interaction.options.getString('negatives');

        if (prompt === null) {
            await interaction.editReply('You need to specify a prompt!');
            return;
        }

        await interaction.editReply('Darki is dreaming...');

        try {
            const payload = createPayload(currentModel, prompt, negatives);
            const imgBuffer = await startImageGeneration(payload);

            const imagheAttachment = new AttachmentBuilder(imgBuffer, { name: 'dream.png' });
            await interaction.editReply({ content: 'Darki has had a dream:', files: [imagheAttachment] });
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }

        isAlreadyRunning = false;
    }
}