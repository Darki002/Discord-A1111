const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

const commands = [
    new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    new SlashCommandBuilder()
        .setName('abilities')
        .setDescription('Lists all Commands'),
        new SlashCommandBuilder()
        .setName('dreamtype')
        .setDescription('Select a SD Model for the Bot, that will be used to generate an Image')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set the model')
                .addStringOption(option =>
                    option.setName('model')
                        .setDescription('The Model to use')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('get')
                .setDescription('Get the current model')),
    new SlashCommandBuilder()
        .setName('dream')
        .setDescription('Generates an Image from the selected Model')
        .addStringOption(option =>
            option.setName('prompt')
                .setDescription('The Prompt for the Image')
                .setRequired(true))
];

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

exports.registrateCommands = async (client) => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

exports.getCommands = () => {
    return commands.filter(command => command.name !== 'ping');
};