const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    },
    {
        name: 'abilities',
        description: 'Lists all Commands'
    },
    {
        name: 'dreamstype',
        description: 'Select a SD Model for the Bot, that will be used to generate an Image',	
    },
    {
        name: 'dream',
        description: 'Generates an Image from the selected Model'
    }
]

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