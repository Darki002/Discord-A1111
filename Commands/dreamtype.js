const {SlashCommandBuilder} = require('discord.js');
const { getModels } = require('../modules/generateImage');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dreamtype')
        .setDescription('Select a SD Model for the Bot, that will be used to generate an Image')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set the model')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Get the current model')),

    async execute(interaction) {
        await interaction.deferReply();
        await interaction.editReply('Dreams are coming soon!');

        try{
            await handleDreamTypesCommand(interaction);
        }
        catch(err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
}

async function handleDreamTypesCommand(interaction) {
    await interaction.deferReply();
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