const {SlashCommandBuilder} = require('discord.js');
const { getModels } = require('../modules/generateImage');
const { getCurrentModel, setCurrentModel } = require('../modules/SelectetModel');

const slashCommand = new SlashCommandBuilder()
.setName('dreamtype')
.setDescription('Select a SD Model for the Bot, that will be used to generate an Image')
.addSubcommand(subcommand =>
    subcommand
        .setName('set')
        .setDescription('Set the model')
        .addStringOption(option =>
            option.setName('model')
                .setDescription('The model to set')
                .setRequired(false))
)
.addSubcommand(subcommand =>
    subcommand
        .setName('get')
        .setDescription('Get the current model'))
.addSubcommand(subcommand =>
    subcommand
        .setName('list')
        .setDescription('List all available models'))
.addSubcommand(subcommand =>
    subcommand
        .setName('help')
        .setDescription('Get help for this command'))

module.exports = {
    data: slashCommand,
    async execute(interaction) {
        await interaction.deferReply();

        try {
            switch (interaction.options.getSubcommand()) {
                case 'set':
                    const model = interaction.options.getString('model');
                    if(model){
                        await dreamTypeSet(interaction);
                    }
                    else {
                        await dreamTypeAction(interaction);
                    }
                    break;
                case 'get':
                    await dreamTypeGetCurrent(interaction);
                    break;
                case 'list':
                    await dreamTypeList(interaction);
                    break;
                case 'help':
                    await help(interaction);
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

async function help(interaction) {
    await interaction.editReply('Help is coming soon!');

    const subcommands = slashCommand.toJSON().options;
    let reply = '### Here are all the available commands:';

    subcommands.forEach(subcommand => {
        reply += `\n - \`${slashCommand.name} ${subcommand.name}\`: ${subcommand.description}`;
    });

    await interaction.editReply(reply);
}

async function dreamTypeList(interaction) {
    await interaction.editReply('Dreams are coming soon!');

    const models = await getModels();
    let reply = '### Dream Types:';

    models.forEach(model => {
        reply += `\n - ${model.split(/[ .]+/)[0]}`;
    });

    await interaction.editReply(reply);
}

async function dreamTypeGetCurrent(interaction) {
    await interaction.editReply('Dream are coming soon!');

    const currentModel = await getCurrentModel();
    await interaction.editReply(`The current model is: ${currentModel}`);

}

async function dreamTypeSet(interaction) {
    await interaction.editReply('Dream is setting!');

    const model = interaction.options.getString('model');
    if (!model) {
        await interaction.editReply('Please provide a model!');
        return;
    }

    const models = await getModels();
    const foundModel = models.filter(m => m.split(/[ .]+/)[0] === model)[0];

    if (!foundModel) {
        await interaction.editReply('This model does not exist!');
        return;
    }

    await setCurrentModel(model);
    await interaction.editReply(`The current model is: ${model}`);
}

async function dreamTypeAction(interaction) {
    await interaction.editReply('Dreams are coming soon!');

    const models = await getModels();
    const row = getModelActionRow(models)
    await interaction.editReply({ content: 'What dream type do you want?!', components: [row] });
}

function getModelActionRow(models) {
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