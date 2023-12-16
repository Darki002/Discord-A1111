const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

const commandsPath = path.join(__dirname, '../Commands');
const commands = fs.readdirSync(commandsPath).map((file) => {
    const command = require(path.join(commandsPath, file));
    return command.data.toJSON();
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all commands'),

    async execute(interaction) {
        let reply = 'Here are all the available commands:\n';

        commands.forEach(command => {
            reply += `\n**${command.name}**: ${command.description}`;
        });

        await interaction.reply(reply);
    }
};