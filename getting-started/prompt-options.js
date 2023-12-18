module.exports.prompt = async (interaction) => {
    let messgae = '## Prompts and Negative Prompts \n'
    messgae += '### Prompts \n'
    messgae += 'Prompts are the text you want to use to generate an Image. You can describe your Image and what you can see in it. \n'
    messgae += '### Negative Prompts \n'
    messgae += 'Negative Prompts are the text you can yous to tell the AI what you don\'t want to have in your Image. \n'
    messgae += '### Tips \n'
    messgae += 'You can look up your model on https://civitai.com and the creater of the model has sometimes examples for good prompt for this model or even some tigger words. \n'

    await interaction.reply(messgae);
}

module.exports.steps = async (interaction) => {
    let messgae = '## Steps \n'
    messgae += 'The Steps define the amount of steps the AI will take to generate your Image. Recommended is bewteen 20-30 Steps. \n'
    messgae += 'Usally the more steps you use the better the Image will be. However this will also increase the time it takes to generate the Image. \n'
    messgae += 'However this will vary from model to model. So you can try out different values or look them up on civitai. \n'

    await interaction.reply(messgae);
}

module.exports.cfgScale = async (interaction) => {
    let messgae = '## CFG Sclae \n'
    messgae += 'The CFG Scale basicly tells the AI how strict it should listen to your Pompt. \n'
    messgae += 'It depence on your model to wich value you want to set it. However most of the cases you will have a value between 5-7 \n'

    await interaction.reply(messgae);
}

module.exports.seed = async (interaction) => {
    let messgae = '## Seed \n'
    messgae += 'The Seed is a random number that will be used to generate your Image. \n'
    messgae += 'To create a random seed you can use the value -1 (default value) \n'
    messgae += 'If you want to use a specific seed you can use any number. You can use this to recreate an Image.'
    messgae += 'However this will only work if you use the same model and the same prompt. \n'
    messgae += 'I recomand you to use the default value most of the time. So you can just leaf this option empty :) \n'

    await interaction.reply(messgae);
}

module.exports.clipSkip = async (interaction) => {
    let messgae = '## CLIP Skip \n'
    messgae += 'The CLIP Skip is a complex subject, so I wont explain it here.'
    messgae += 'I recomand you leaf it to the default value. If you choose to change it, set it to 1 or 2. \n'
    messgae += 'However it can improve your results when you use the correct value for your model. You can find this also on the civitai website \n'

    await interaction.reply(messgae);
}