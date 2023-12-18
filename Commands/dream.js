const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const { createPayload, startImageGeneration } = require('../modules/generateImage');
const { getCurrentModel, getCurrentSampler } = require('../modules/SelectetModel');

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
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('width')
                .setDescription('Width of the Image. Deafult: 512 (min 64)')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('height')
                .setDescription('Height of the Image. Default: 512 (min 64)')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('cfg scale')
                .setDescription('cfg scale. Default: 7 (1 - 10)')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('steps')
                .setDescription('Steps. Default: 20 (1 - 50)')
                .setRequired(false))
        .addNumberOption(option =>
            option.setName('CLIP skip')
                .setDescription('CLIP Skip. Default: 1 (1 - 10)')
                .setRequired(false)),

    async execute(interaction) {
        await interaction.deferReply();

        const currentModel = await getCurrentModel();
        if (currentModel === undefined) {
            await interaction.editReply('You need to select a dream first!');
            return;
        }
        const sampler = await getCurrentSampler();

        const prompt = interaction.options.getString('prompt');
        const negatives = interaction.options.getString('negatives');
        const width = interaction.options.getNumber('width');
        const height = interaction.options.getNumber('height');
        const cfgScale = interaction.options.getNumber('cfg scale');
        const steps = interaction.options.getNumber('steps');
        const clipSkip = interaction.options.getNumber('CLIP skip');

        const userInputCheck = await checkUserInputs(interaction, prompt, width, height, cfgScale, steps, clipSkip);
        if (!userInputCheck) {
            return;
        }

        await interaction.editReply('Darki is dreaming...');

        try {
            // Add ClipSkipt to Request
            const payload = createPayload(currentModel, sampler, prompt, negatives, width, height, steps, cfgScale);
            const imgBuffer = await startImageGeneration(payload);

            const imagheAttachment = new AttachmentBuilder(imgBuffer, { name: 'dream.png' });
            await interaction.editReply({ content: 'Darki has had a dream:', files: [imagheAttachment] });
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
}

async function checkUserInputs(interaction, prompt, width, height, cfgScale, steps, clipSkip) {
    if (prompt === null) {
        await interaction.editReply('You need to specify a prompt!');
        return false;
    }

    const imgCheck = await checkImageSize(width, height, interaction)
    const cfgCheck = await checkCFGScale(cfgScale, interaction);
    const stepsCheck = await checkSteps(steps, interaction);
    const clipCheck = await checkCLIPSkip(clipSkip, interaction);
    return imgCheck && cfgCheck && stepsCheck && clipCheck;
}

async function checkImageSize(width, height, interaction) {
    if (width === null || height === null) {
        return true;
    }
    if (width < 64 || height < 64) {
        await interaction.editReply('Width and Height must be at least 64!');
        return false;
    }
    return true;
}

async function checkCFGScale(cfgScale, interaction) {
    if (cfgScale === null) {
        return true;
    }
    if (cfgScale > 10 || cfgScale < 1) {
        await interaction.editReply('CFG Scale must be between 1 and 10!');
        return false;
    }
    return true;
}

async function checkSteps(steps, interaction) {
    if (steps === null) {
        return true;
    }
    if (steps > 50 || steps < 1) {
        await interaction.editReply('Steps must be between 1 and 50!');
        return false;
    }
    return true;
}

async function checkCLIPSkip(clipSkip, interaction) {
    if (clipSkip === null) {
        return true;
    }
    if (clipSkip > 10 || clipSkip < 1) {
        await interaction.editReply('CLIP Skip must be between 1 and 10!');
        return false;
    }
    return true;
}