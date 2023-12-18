module.exports = async (interaction) => {
    const messgae = '## CLIP Skip \n'
    messgae += 'The CLIP Skip is a complex subject, so I wont explain it here.'
    messgae += 'I recomand you leaf it to the default value. If you choose to change it, set it to 1 or 2. \n'
    messgae += 'However it can improve your results when you use the correct value for your model. You can find this also on the civitai website \n'

    await interaction.reply(messgae);
}