const { SlashCommandBuilder } = require('discord.js');
const {getCommandData} = require('../comments');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all commands'),

    async execute(interaction) {
        let reply = '### Here are all the available commands:';

        let commands = undefined;

        try { 
            commands = await getCommandData();
        }
        catch (err) {
            await interaction.reply('Sowwy, I can\'t help you right now :c');
            console.error(err);
            return;
        }

        commands.forEach(command => {
            reply += `\n - **${command.name}**: ${command.description}`;
        });

        await interaction.reply(reply);
    }
};