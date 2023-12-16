const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const {getCommandData} = require('../comments');

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

exports.registrateCommands = async (client) => {
    try {
        console.log('Started refreshing application (/) commands.');

        const commandData = await getCommandData();

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: commandData },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}