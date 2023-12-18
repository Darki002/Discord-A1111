const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getSamplers } = require('../modules/generateImage');
const { getCurrentSamplerForUser, setCurrentSamplerForUser } = require('../modules/SelectetModel');

const slashCommand = new SlashCommandBuilder()
    .setName('dream-sampler')
    .setDescription('Select a Sampler for the Bot, that will be used to generate an Image')
    .addSubcommand(subcommand =>
        subcommand
            .setName('set')
            .setDescription('Set the sampler')
            .addStringOption(option =>
                option.setName('sampler')
                    .setDescription('The sampler to set')
                    .setRequired(false)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('get')
            .setDescription('Get the current sampler'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('List all available samplers'));

module.exports = {
    data: slashCommand,
    async execute(interaction) {
        await interaction.deferReply();

        try {
            switch (interaction.options.getSubcommand()) {
                case 'set':
                    const sampler = interaction.options.getString('sampler');
                    if (sampler) {
                        await dreamSamplerSet(interaction);
                    }
                    else {
                        await dreamSamplerAction(interaction);
                    }
                    break;
                case 'get':
                    await dreamTypeGetCurrent(interaction);
                    break;
                case 'list':
                    await dreamTypeList(interaction);
                    break;
                default:
                    await interaction.editReply('Darki is having a nightmare!');
                    break;
            }
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
}

async function dreamTypeList(interaction) {
    await interaction.editReply('Dreams are coming soon!');

    const samplers = await getSamplers();
    let reply = '### Dream Samplers:';

    samplers.forEach(sampler => {
        reply += `\n - ${sampler}`;
    });

    await interaction.editReply(reply);
}

async function dreamTypeGetCurrent(interaction) {
    await interaction.editReply('Dream are coming soon!');

    const currentSampler = await getCurrentSamplerForUser(interaction.user);
    await interaction.editReply(`Your sampler is currently the \"${currentSampler}\" sampler`);
}

async function dreamSamplerSet(interaction) {
    await interaction.editReply('Dream is setting!');

    const sampler = interaction.options.getString('sampler');
    if (!sampler) {
        await interaction.editReply('Please provide a sampler!');
        return;
    }

    const samplers = await getSamplers();
    const foundSampler = models.find(s => s === samplers);

    if (!foundSampler) {
        await interaction.editReply('This sampler does not exist!');
        return;
    }

    await setCurrentSamplerForUser(foundSampler, interaction.user);
    await interaction.editReply(`Your sampler has changed to the \"${sampler}\" sampler`);
}

async function dreamSamplerAction(interaction) {
    await interaction.editReply('Dreams are coming soon!');

    const samplers = await getSamplers();
    const row = getSamplerActionRow(samplers);
    await interaction.editReply({ content: 'What dream sampler do you want?!', components: [row] });
}

function getSamplerActionRow(sampler) {

    const samplersMap = sampler
        .filter(s => s.includes('DPM') || s.includes('Euler'))
        .map(sampler => {
            return {
                label: sampler,
                value: sampler
            }
        })

    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('dream-sampler')
                .setPlaceholder('Select a dream sampler')
                .addOptions(samplersMap)
        );
}