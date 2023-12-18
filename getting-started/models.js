const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const messgae = '## Models \n'
    messgae += 'To generate a Image you need to select a Model. You can do this by using the \`/dream-model\` commands. \n';
    messgae += 'It will show you a dropdown with all available models. \n';
    messgae += 'Choose one and you are ready to continiue! \n';

    const continiueButton = new ButtonBuilder()
        .setCustomId('continue-to-sampler')
        .setLabel('Continue')
        .setStyle('SUCCESS');

    const row = new ActionRowBuilder().addComponents(continiueButton);

    await interaction.reply({ content: messgae, components: [row] });
}