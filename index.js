require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { setCurrentModel } = require('./modules/SelectetModel');
const { registrateCommands } = require('./modules/registrateCommands');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
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
        if(interaction.customId === 'dreamstype'){
            const model = interaction.values[0];
            try{
                await setCurrentModel(model);
            }
            catch {
                await interaction.reply('There was an error while selecting this dream!');
                return;
            }

            const modelName = model.split(/[ .]+/)[0];
            await interaction.reply(`Selected dream: ${modelName}`);
        }
    }
});

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

client.login(process.env.DISCORD_TOKEN);