import dotenv from 'dotenv';
dotenv.config();
import { Client, GatewayIntentBits, MessageActionRow, MessageSelectMenu } from 'discord.js';
import { getModels, createPayload, startImageGeneration } from './dream.js';

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

    if (interaction.commandName === 'dreams') {
        await interaction.deferReply();
        await interaction.editReply('Dreams are coming soon!');

        try {
            const models = await getModels();
            const modelsMap = models.map(model => model.title)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('dreams')
                        .setPlaceholder('Select a dream')
                        .addOptions(modelsMap)
                );

            await interaction.editReply({ content: 'What dream do you want?!', components: [row] });
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
    else if (interaction.isStringSelectMenu()) {
        if (interaction.customId === 'dreams') {
            currentModel = interaction.values[0];
            await interaction.reply(`Selected dream: ${currentModel}`)
        }
    }
    else if (interaction.commandName === 'dream') {
        await interaction.deferReply();

        if (currentModel === undefined) {
            await interaction.editReply('You need to select a dream first!');
            return;
        }

        await interaction.editReply('Darki is dreaming...');

        try {
            const payload = createPayload(currentModel);
            const base64Image = await startImageGeneration(payload);

            await interaction.editReply({ content: 'Darki has dreamed:', files: [base64Image] });
        }
        catch (err) {
            console.log(err);
            await interaction.editReply('Darki is having a nightmare!');
        }
    }
});

client.login(process.env.DISCORD_TOKEN);