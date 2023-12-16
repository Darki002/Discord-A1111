const { Collection } = require('discord.js');
const path = require('path');
const fs = require('fs').promises;

const commandsPath = path.join(__dirname, './Commands');

module.exports.getCommandData = async () => {
    const files = await fs.readdir(commandsPath);
    const commands = files.map((file) => {
        const command = require(path.join(commandsPath, file));
        if (command.data) {
            return command.data.toJSON();
        } else {
            console.error(`Command file ${file} does not export a 'data' property.`);
            return null;
        }
    }).filter(command => command !== null);

    return commands;
}

module.exports.getCommandExecutions = async () => {
    const files = await fs.readdir(commandsPath);

    const commandsCollection = new Collection();

    files.forEach((file) => {
        const command = require(path.join(commandsPath, file));
        if (command) {
            commandsCollection.set(command.data.name, command);
        } else {
            console.error(`Command file ${file} does not export a 'execute' function.`);
        }
    });

    return commandsCollection;
}