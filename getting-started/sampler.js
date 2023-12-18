const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const messgae = '## Sampler \n'
    messgae += 'You can skip this step and use the default sampler. In that case you can press continiue. \n'
    messgae += 'However, keep in mind that you can improve the Image quality with the right sampler. \n'
    messgae += 'If you want to find the best sampler for your Model go to https://civitai.com and look up your model. \n'
    messgae += 'You can do choose a sampler by using the \`/dream-sampler\` commands. ';
    messgae += 'It will show you a dropdown again, with all available samplers. \n';
    messgae += 'Choose one and your preparations are finished :P \n';

    const continiueButton = new ButtonBuilder()
        .setCustomId('continue-to-first-prompt')
        .setLabel('Continue')
        .setStyle('SUCCESS');

    const row = new ActionRowBuilder().addComponents(continiueButton);

    await interaction.reply({ content: messgae, components: [row] });
}