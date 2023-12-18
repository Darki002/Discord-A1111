const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = async (interaction) => {
    const messgae = '## First Prompt \n'
    messgae += 'To generate an Image you can use the \`/dream\`. The option prompt will be required. \n'
    messgae += 'However there are a bunch of other options and they are all optional. But they can help you to get uch better results if you use them.\n'
    messgae += 'You can always keep them empty and use the default values. This will work just fine as well. \n'
    messgae += 'Press the Button with the option you want to read more about. You can press them again and again. So fiel free to read all of them :) \n'

    const promptButton = new ButtonBuilder()
        .setCustomId('getting-started-prompt')
        .setLabel('Pormpt and Negatives')
        .setStyle('SUCCESS');

    const stepsButton = new ButtonBuilder()
        .setCustomId('getting-started-steps')
        .setLabel('Steps')
        .setStyle('SUCCESS');

    const cfgSclaeButton = new ButtonBuilder()
        .setCustomId('getting-started-cfg-scale')
        .setLabel('CFG Scale')
        .setStyle('SUCCESS');

    const seedButton = new ButtonBuilder()
        .setCustomId('getting-started-seed')
        .setLabel('Seed')
        .setStyle('SUCCESS');

    const clipSkipButton = new ButtonBuilder()
        .setCustomId('getting-started-clip-skip')
        .setLabel('Clip Skip')
        .setStyle('SUCCESS');

    const row = new ActionRowBuilder()
        .addComponents(promptButton)
        .addComponents(stepsButton)
        .addComponents(cfgSclaeButton)
        .addComponents(seedButton)
        .addComponents(clipSkipButton);

    await interaction.reply({ content: messgae, components: [row] });
}