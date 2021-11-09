const { readdirSync } = require("fs")
const { TOKEN, CLIENT_ID, GUILD_ID } = require('../config.json');
const { Routes } = require('discord-api-types/v9');
const { REST } = require("@discordjs/rest");
const delay = require("delay");


module.exports = (client) => {
    try {
        const commandFiles = readdirSync("./slashCommands").filter(file => file.endsWith(".js"))
        const commands = [];
        
        for (const file of commandFiles) {
            const command = require(`../slashCommands/${file}`);
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command)
        }
        
        const rest = new REST({ version: '9' }).setToken(TOKEN);
        
        (async () => {
        try {
          await delay(2000);
          console.log(` [${String(new Date).split(" ", 5).join(" ")}] || ==> || Refreshing application (/) commands.`);
        
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands },
          );
        
          console.log(` [${String(new Date).split(" ", 5).join(" ")}] || ==> || Reloaded application (/) commands.`);
        } catch (error) {
          console.error(error);
        }
        })();
    } catch (e) {
        console.log(e);
    }
};