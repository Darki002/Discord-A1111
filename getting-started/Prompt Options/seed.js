module.exports = async (interaction) => {
    const messgae = '## Seed \n'
    messgae += 'The Seed is a random number that will be used to generate your Image. \n'
    messgae += 'To create a random seed you can use the value -1 (default value) \n'
    messgae += 'If you want to use a specific seed you can use any number. You can use this to recreate an Image.'
    messgae += 'However this will only work if you use the same model and the same prompt. \n'
    messgae += 'I recomand you to use the default value most of the time. So you can just leaf this option empty :) \n'

    await interaction.reply(messgae);
}