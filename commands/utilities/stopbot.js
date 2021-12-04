const chalk = require('chalk');
const { MessageEmbed } = require('discord.js');
const { OWNER_ID } = require('../../config.json');

module.exports = {
    config: {
        name: "restart",
        description: "shuts down the client!",
        category: "utilities",
        accessableby: "Owner",
        aliases: ["stopbot"]
    },
    run: async (client, message, args) => {
    if(message.author.id != OWNER_ID) return message.channel.send("You not the client the owner!")

    const restart = new MessageEmbed()
        .setDescription("**Account has been**: `Shutting down...`")
        .setColor("#000001");

    await message.channel.send({ embeds: [restart] });
        console.log(chalk.red(`[CLIENT] Restarting...`));
            
    process.exit();
    }
};