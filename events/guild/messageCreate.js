const { prefix } = require('../../config.json');
const { onCoolDown, replacemsg } = require("../../handlers/functions.js");
const Discord = require("discord.js");

module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;
    if(message.channel.partial) await message.channel.fetch();
    if(message.partial) await message.fetch();

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})`);
    if(!prefixRegex.test(message.content)) return;

    const [, mPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(mPrefix.length).trim().split(/ +/).filter(Boolean);
    const cmd = args.length > 0 ? args.shift().toLowerCase() : null;

    let command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if (onCoolDown(message, command)) {
          return message.reply({
            embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle(replacemsg(`Please slowdown....`, {
                prefix: prefix,
                command: command,
                timeLeft: onCoolDown(message, command)
              }))]
          });
        }

        try {
          //if Command has specific permission return error
          if (command.memberpermissions && command.memberpermissions.length > 0 && !message.member.permissions.has(command.memberpermissions)) {
            return message.reply({ embeds: [new Discord.MessageEmbed()
                .setColor('#000001')
                .setTitle(replacemsg(`You are not allowed to run this command!`))
                .setDescription(replacemsg(`You dont' have permissions!`, {
                  command: command,
                  prefix: prefix
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, `You dont' have permissions!`)}).catch((e) => {console.log(String(e).grey)});
          }
          //if Command has specific needed roles return error
          if (command.requiredroles && command.requiredroles.length > 0 && message.member.roles.cache.size > 0 && !message.member.roles.cache.some(r => command.requiredroles.includes(r.id))) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle(replacemsg(`You are not allowed to run this command!`))
              .setDescription(replacemsg(`You need to have one of the Following Roles`, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, `You need to have one of the Following Roles`)}).catch((e) => {console.log(String(e).grey)});
            
          }
          //if Command has specific users return error
          if (command.alloweduserids && command.alloweduserids.length > 0 && !command.alloweduserids.includes(message.author.id)) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle(replacemsg(`You are not allowed to run this command!`))
              .setDescription(replacemsg(`You need to be one of the Owners`, {
                command: command,
                prefix: prefix
              }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, `You need to be one of the Owners`)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has minimum args, and user dont entered enough, return error
          if(command.minargs && command.minargs > 0 && args.length < command.minargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle("Wrong Command Usage!")
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 3000)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args, and user enters too many, return error
          if(command.maxargs && command.maxargs > 0 && args.length > command.maxargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle("Wrong Command Usage!")
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argstoomany_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 3000)}).catch((e) => {console.log(String(e).grey)});
          }
          
          //if command has minimum args (splitted with "++"), and user dont entered enough, return error
          if(command.minplusargs && command.minplusargs > 0 && args.join(" ").split("++").filter(Boolean).length < command.minplusargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle("Wrong Command Usage!")
              .setDescription(command.argsmissing_message && command.argsmissing_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 3000)}).catch((e) => {console.log(String(e).grey)});
          }
          //if command has maximum args (splitted with "++"), and user enters too many, return error
          if(command.maxplusargs && command.maxplusargs > 0 && args.join(" ").split("++").filter(Boolean).length > command.maxplusargs) {
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor('#000001')
              .setTitle(":x: Wrong Command Usage!")
              .setDescription(command.argstoomany_message && command.argstoomany_message.trim().length > 0 ? command.argsmissing_message : command.usage ? "Usage: " + command.usage : "Wrong Command Usage")]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 3000)}).catch((e) => {console.log(String(e).grey)});
          }
          //run the command with the parameters:  client, message, args, Cmduser, text, prefix,
          command.run(client, message, args, args.join(" ").split("++").filter(Boolean), message.member, args.join(" "), prefix);
        } catch (error) {
          if (true) {
            return message.reply({
              embeds: [new Discord.MessageEmbed()
                .setColor('#000001')
                .setTitle(replacemsg(`Something went wrong!`, {
                  prefix: prefix,
                  command: command
                }))
                .setDescription(replacemsg(`\`\`\`${errormessage}\`\`\``, {
                  error: error,
                  prefix: prefix,
                  command: command
                }))]
            }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 4000)}).catch((e) => {console.log(String(e).grey)});
          }
        }
      } else //if the command is not found send an info msg
        return message.reply({
          embeds: [new Discord.MessageEmbed()
            .setColor('#000001')
            .setTitle(replacemsg(`Unkown command, try: **\`${prefix}help\`**`, {
              prefix: prefix
            }))]
        }).then(msg => {setTimeout(()=>{msg.delete().catch((e) => {console.log(String(e).grey)})}, 4000)}).catch((e) => {console.log(String(e).grey)});
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}
