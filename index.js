const dotenv = require('dotenv');
const { Client, GatewayIntentBits } = require('discord.js');
const { handleDreamCommand, handleDreamTypesCommand } = require('./handleCommands.js');

dotenv.config();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
    ]
});

const currentModel = undefined;

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

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

client.login(process.env.DISCORD_TOKEN);