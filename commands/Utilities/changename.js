const { MessageEmbed } = require('discord.js');
const { OWNER_ID } = require('../../config.json');

module.exports = {
  name: "changename",
  category: "Utilities",
  aliases: ["changebotname", "botname"],
  cooldown: 5,
  usage: "changename <NEW BOT NAME>",
  description: "Changes the Name of the BOT",
  alloweduserids: OWNER_ID,
  minargs: 1,
 
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      if (args.join(" ").length > 32){
        return message.reply({embeds: [new MessageEmbed()
          .setColor('#000001')
          .setTitle(`Bot Name too long, can't have more then 32 Letters!`)
          
        ]});
      }
      client.user.setUsername(args.join(" "))
        .then(user => {
          return message.reply({embeds: [new MessageEmbed()
            .setColor('#000001')
            .setTitle(`Changed my Name to: \`${user.username}\``)

          ]});
        })
        .catch(e => {
          return message.reply({embeds: [new MessageEmbed()
            .setColor('#000001')
            .setTitle(`Something went Wrong`)
            .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)

          ]});
        });
    } catch (e) {
      console.log(e)
      return message.reply({embeds: [new MessageEmbed()
          .setColor('#000001')
          .setTitle(`❌ ERROR | An error occurred`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)

      ]});
    }
  },
};