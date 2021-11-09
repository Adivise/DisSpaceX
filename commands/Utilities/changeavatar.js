const { MessageEmbed } = require('discord.js');
const { OWNER_ID } = require('../../config.json');
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
  name: "changeavatar",
  category: "Utilities",
  aliases: ["changebotavatar", "botavatar", "botprofilepicture", "botpfp"],
  cooldown: 5,
  usage: "changeavatar <Imagelink/Image>",
  description: "Changes the Avatar of the BOT: I SUGGEST YOU TO DO IT LIKE THAT: Type the command in the Chat, attach an Image to the Command (not via link, just add it) press enter",
  alloweduserids: OWNER_ID,

  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      var url;
      if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)) {
          const response = await fetch(url);
          const buffer = await response.buffer();
          await fs.writeFile(`./image.jpg`, buffer, () =>{
            console.log('finished downloading!')
          });
          client.user.setAvatar(`./image.jpg`)
            .then(user => {
              try {
                fs.unlinkSync("./image.jpg")
              } catch {}
              return message.reply({embeds: [new MessageEmbed()
                .setTitle(`Successfully, changed the Bot avatar!`)
                .setColor("#000001")
              ]});
            })
            .catch(e => {
              return message.reply({embeds: [new MessageEmbed()
                .setColor('#000001')
                .setTitle(`Something went Wrong`)
                .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
              ]});
            });
        } else {
          return message.reply({embeds: [new MessageEmbed()
            .setTitle(`ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\``)
            .setColor('#000001')
          ]});
        }
      } else if (message.content && textIsImage(message.content)) {
        url = args.join(" ")
        const response = await fetch(url);
        const buffer = await response.buffer();
        await fs.writeFile(`./image.jpg`, buffer, () =>
          console.log('finished downloading!'));
        client.user.setAvatar(`./image.jpg`)
          .then(user => {
            try {
              fs.unlinkSync("./image.jpg")
            } catch {

            }
            return message.reply({embeds: [new MessageEmbed()
              .setTitle(`Successfully, changed the Bot avatar!`)
              .setColor('#000001')
            ]});
          })
          .catch(e => {
            return message.reply({embeds: [new MessageEmbed()
              .setColor('#000001')
              .setTitle(`Something went Wrong`)
              .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
            ]});
          });

      } else {
        return message.reply({embeds: [new MessageEmbed()
          .setTitle(`ERROR | Could not use your Image as an Avatar, make sure it is a \`png\` / \`jpg\` / \`webp\``)
          .setDescription(`Useage: \`${prefix}changeavatar <AVATARLINK/IMAGE>\``)
          .setColor('#000001')
        ]});
      }

      function attachIsImage(msgAttach) {
        url = msgAttach.url;

        return url.indexOf("png", url.length - "png".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpeg", url.length - "jpeg".length /*or 3*/ ) !== -1 ||
          url.indexOf("jpg", url.length - "jpg".length /*or 3*/ ) !== -1;
      }

      function textIsImage(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
      }


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
