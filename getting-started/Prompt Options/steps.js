module.exports = async (interaction) => {
    const messgae = '## Steps \n'
    messgae += 'The Steps define the amount of steps the AI will take to generate your Image. Recommended is bewteen 20-30 Steps. \n'
    messgae += 'Usally the more steps you use the better the Image will be. However this will also increase the time it takes to generate the Image. \n'
    messgae += 'However this will vary from model to model. So you can try out different values or look them up on civitai. \n'

    await interaction.reply(messgae);
}