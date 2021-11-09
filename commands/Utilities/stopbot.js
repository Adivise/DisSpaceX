const { MessageEmbed } = require('discord.js');
const { OWNER_ID } = require('../../config.json');
const chalk = require('chalk');

module.exports = {
  name: "stopbot",
  category: "Utilities",
  aliases: ["restart"],
  cooldown: 5,
  description: "Only owner the can't shutdown",
  alloweduserids: OWNER_ID,

  run: async (client, message) => {

    const restart = new MessageEmbed()
      .setDescription("**Account has been**: `Shutting down...`")
      .setColor("#000001");

        await message.channel.send({ embeds: [restart] })
            console.log(chalk.red(`  [${message.guild.me.displayName}] || Restarting...`));
            
        process.exit();
      }
};
