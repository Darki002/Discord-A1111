const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../Commands').filter(file => file.endsWith('.js'));

const commands = fs.readdirSync(commandsPath).map((file) => {
    const command = require(path.join(commandsPath, file));
    return command.data.toJSON();
});

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