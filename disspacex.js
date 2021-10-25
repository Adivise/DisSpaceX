const { Client, Collection } = require("discord.js");
const { token } = require("./config.json");
const client = new Client();

["aliases", "commands"].forEach(x => client[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handlers/${x}`)(client));

client.login(token);