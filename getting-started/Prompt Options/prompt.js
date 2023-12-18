module.exports = async (interaction) => {
    const messgae = '## Prompts and Negative Prompts \n'
    messgae += '### Prompts \n'
    messgae += 'Prompts are the text you want to use to generate an Image. You can describe your Image and what you can see in it. \n'
    messgae += '### Negative Prompts \n'
    messgae += 'Negative Prompts are the text you can yous to tell the AI what you don\'t want to have in your Image. \n'
    messgae += '### Tips \n'
    messgae += 'You can look up your model on https://civitai.com and the creater of the model has sometimes examples for good prompt for this model or even some tigger words. \n'

    await interaction.reply(messgae);
}