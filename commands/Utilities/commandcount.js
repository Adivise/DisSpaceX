const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "commandcount",
  category: "Utilities",
  aliases: ["cmdcount", "commandamount", "cmdamount"],
  cooldown: 5,
  usage: "commandcount",
  description: "Shows the Amount of Commands an Categories",

  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      message.reply({embeds: [new MessageEmbed()
        .setColor('#000001')
        .setAuthor('Command Count!', client.user.avatarURL())
        .setDescription(`**[${client.categories.length}] Categories** \n **[${client.commands.size}] Commands**`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
        .setTimestamp()
      ]});

    } catch (e) {
      console.log(e)

      return message.reply({embeds: [new MessageEmbed()
          .setColor('#000001')
          .setAuthor(`ERROR | An error occurred`, client.user.avatarURL())
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
          .setTimestamp()
      ]});

    }
  }
}
