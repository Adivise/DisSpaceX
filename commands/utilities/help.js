const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  category: "Utilities",
  aliases: ["h", "commandinfo", "cmds", "cmd", "halp"],
  cooldown: 3,
  usage: "help [Commandname]",
  description: "Returns all Commmands, or one specific command",

    run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
      try{
        if (args[0]) {
          const embed = new MessageEmbed();
          const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
          if (!cmd) {
              return message.reply({embeds: [embed
                .setColor('#000001')
                .setDescription(`No Information found for command **${args[0].toLowerCase()}**`)]});
          }
          if (cmd.name) embed.addField("**Command name**", `\`${cmd.name}\``);
          if (cmd.name) embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
          if (cmd.description) embed.addField("**Description**", `\`${cmd.description}\``);
          if (cmd.aliases) embed.addField("**Aliases**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
          if (cmd.cooldown) embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
          else embed.addField("**Cooldown**", `\`1.5 Second\``);
          if (cmd.usage) {
              embed.addField("**Usage**", `\`${prefix}${cmd.usage}\``);
              embed.setFooter("Syntax: <> = required, [] = optional");
          }
          return message.reply({embeds: [embed
            .setColor('#000001')
          ]});
          
        } else {
          const embed = new MessageEmbed()
              .setColor('#000001')
              .setThumbnail(client.user.displayAvatarURL())
              .setAuthor(`${message.guild.me.displayName} Help Command!`, message.guild.iconURL())
              .setDescription(`The bot prefix is: **${prefix}**`)
              .setFooter(`© ${message.guild.me.displayName} | Total Commands: ${client.commands.size}`, client.user.displayAvatarURL());

          const commands = (category) => {
              return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
          };
          try {
            for (let i = 0; i < client.categories.length; i += 1) {
              const current = client.categories[i];
              const items = commands(current);
              embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `${items.join(", ")}`);
            }
          } catch (e) {
              console.log(e);
          }
          message.reply({embeds: [embed]});
      }
    } catch (e) {
        console.log(e)

        return message.reply({embeds: [new MessageEmbed()
            .setColor('#000001')
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            .setTimestamp()
        ]});
    }
  }
}
