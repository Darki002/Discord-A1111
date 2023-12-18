const { ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports.models = async (interaction) => {
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

module.exports.sampler = async (interaction) => {
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

module.exports.firstPrompt = async (interaction) => {
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