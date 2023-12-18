const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

const command = new SlashCommandBuilder()
    .setName('getting-started')
    .setDescription('Tutorial for this Image Generater!');


module.exports = {
    data: command,
    async execute(interaction) {
        const messgae = `Hi, ${interaction.user}! I will try to guide you through this Image Generator so you can get your first Image created by an AI :)`;

        const continiueButton = new ButtonBuilder()
            .setCustomId('continue-to-models')
            .setLabel('Continue')
            .setStyle('Primary');

        const row = new ActionRowBuilder().addComponents(continiueButton);

        await interaction.reply({ content: messgae, components: [row] });
    }
}