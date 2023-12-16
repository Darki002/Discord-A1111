require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { handleDreamCommand, handleDreamTypesCommand, setCurrentModel, getCurrentModel } = require('./modules/handleCommands');
const { registrateCommands, getCommands } = require('./modules/registrateCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('interactionCreate', async interaction => {

    if(interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
        return;
    }

    if(interaction.commandName === 'abilities') {
        const commands = getCommands();
        await interaction.reply(`### Commands: \n ${commands.map(command => {
            return `- \`${command.name}\`: ${command.description} \n`
        }).join('')}`)
        return;
    }

    if (interaction.commandName === 'dreamtype') {
        const command = interaction.options.getSubcommand();
        if(command === 'set') {  
            await handleDreamTypesCommand(interaction);
        }
        else if(command === 'get') {
            const currentModel = getCurrentModel();
            if(currentModel === undefined) {
                await interaction.reply('No model selected!');
                return;
            }
            await interaction.reply(`Current model: ${currentModel}`);
            return;
        }
    }
    else if (interaction.isStringSelectMenu()) {
        await setCurrentModel(interaction);
    }
    else if (interaction.commandName === 'dream') {
        await handleDreamCommand(interaction);
    }
    else if(interaction.commandName === 'dreamtype') {
        await handleDreamTypesCommand(interaction);
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    try {
        await registrateCommands(client);
        console.log('Commands registered!');
        console.log('Bot is ready!');
    }
    catch (error) {
        console.error(error);
    }
});

client.login(process.env.DISCORD_TOKEN);