require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { setCurrentModelForUser: setCurrentModel, setCurrentSamplerForUser: setCurrentSampler } = require('./modules/SelectetModel');
const { registrateCommands } = require('./modules/registrateCommands');
const { getCommandExecutions } = require('./comments');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

(async () => {
    client.commands = await getCommandExecutions();
})();

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
        await registrateCommands(client);
        console.log('Bot is ready!');
    }
    catch (error) {
        console.error(error);
    }
});

client.on('interactionCreate', async interaction => {
    if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
        return;
    }
    if (interaction.isStringSelectMenu()) {

        switch (interaction.customId) {
            case 'dreams-model':
                await dreamsModel(interaction);
                break;
            case 'dreams-sampler':
                await dreamSamplerAction(interaction);
                break;
            default:
                break;
        }
    }
});

client.login(process.env.DISCORD_TOKEN);

async function dreamSamplerAction(interaction) {
    const sampler = interaction.values[0];
    try {
        await setCurrentSampler(sampler, interaction.user);
    }
    catch {
        await interaction.reply('There was an error while selecting this sampler!');
        return;
    }

    await interaction.reply(`Your sampler has changed to the \"${sampler}\" sampler`);
}

async function dreamsModel(interaction) {
    const model = interaction.values[0];
    const user = interaction.user;
    try {
        await setCurrentModel(model, user);
    }
    catch {
        await interaction.reply('There was an error while selecting this dream!');
        return;
    }

    const modelName = model.split(/[ .]+/)[0];
    await interaction.reply(`Your model has changed to the \"${modelName}\" model`);
}