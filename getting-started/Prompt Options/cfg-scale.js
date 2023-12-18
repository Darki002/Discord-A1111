module.exports = async (interaction) => {
    const messgae = '## CFG Sclae \n'
    messgae += 'The CFG Scale basicly tells the AI how strict it should listen to your Pompt. \n'
    messgae += 'It depence on your model to wich value you want to set it. However most of the cases you will have a value between 5-7 \n'

    await interaction.reply(messgae);
}