require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { handleDreamCommand, handleDreamTypesCommand } = require('./modules/handleCommands');
const { registrateCommands, getCommands } = require('./modules/registrateCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const currentModel = undefined;

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

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

    if (interaction.commandName === 'dreamstype') {
        await handleDreamTypesCommand(interaction);
    }
    else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'dreamstype') {
            currentModel = interaction.values[0];
            await interaction.reply(`Selected dream: ${currentModel}`)
        }
    }
    else if (interaction.commandName === 'dream') {
        await handleDreamCommand(interaction, currentModel);
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