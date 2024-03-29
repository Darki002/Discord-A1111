const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { getModels } = require('../modules/generateImage');
const { getCurrentModelForUser, setCurrentModelForUser } = require('../modules/SelectetModel');

const slashCommand = new SlashCommandBuilder()
    .setName('dream-model')
    .setDescription('Select a SD Model for the Bot, that will be used to generate an Image')
    .addSubcommand(subcommand =>
        subcommand
            .setName('set')
            .setDescription('Set the model')
            .addStringOption(option =>
                option.setName('model')
                    .setDescription('The model to set')
                    .setRequired(false)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('get')
            .setDescription('Get the current model'))
    .addSubcommand(subcommand =>
        subcommand
            .setName('list')
            .setDescription('List all available models'));

module.exports = {
    data: slashCommand,
    async execute(interaction) {
        await interaction.deferReply();

        try {
            switch (interaction.options.getSubcommand()) {
                case 'set':
                    const model = interaction.options.getString('model');
                    if (model) {
                        await dreamModelSet(interaction);
                    }
                    else {
                        await dreamModelAction(interaction);
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

    const models = await getModels();
    let reply = '### Dream Models:';

    models.forEach(model => {
        reply += `\n - ${getModelName(model)}`;
    });

    await interaction.editReply(reply);
}

async function dreamTypeGetCurrent(interaction) {
    await interaction.editReply('Dream is coming soon!');

    try {
        const currentModel = await getCurrentModelForUser(interaction.user);
        if (currentModel === undefined) {
            await interaction.editReply('You have no model selected!');
        }
        else {
            await interaction.editReply(`Your model is currently the \"${getModelName(currentModel)}\" model`);
        }
    }
    catch (err) {
        console.log(err);
        await interaction.editReply('Darki is having a nightmare!');
    }
}

async function dreamModelSet(interaction) {
    await interaction.editReply('Dream is setting!');

    const model = interaction.options.getString('model');
    if (!model) {
        await interaction.editReply('Please provide a model!');
        return;
    }

    const models = await getModels();
    const foundModel = models.find(m => getModelName(m) === model);

    if (!foundModel) {
        await interaction.editReply('This model does not exist!');
        return;
    }

    await setCurrentModelForUser(foundModel, interaction.user);
    await interaction.editReply(`Your model has changed to \n${model}\"`);
}

async function dreamModelAction(interaction) {
    await interaction.editReply('Dreams are coming soon!');

    const models = await getModels();
    const firstModels = models.slice(0, 25);
    const row = getModelActionRow(firstModels);
    await interaction.editReply({ content: 'What dream model do you want?!', components: [row] });
}

function getModelActionRow(models) {
    const modelsMap = models.map(model => {
        return {
            label: getModelName(model),
            value: model
        }
    })

    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('dreams-model')
                .setPlaceholder('Select a dream model')
                .addOptions(modelsMap)
        );
}

function getModelName(model) {
    return model.split(/[ .]+/)[0];
}