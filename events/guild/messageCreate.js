const { Permissions, MessageEmbed } = require("discord.js");

module.exports = async (client, message) => { 
    if(message.author.bot || message.channel.type === "dm") return;

    const PREFIX = client.prefix;

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
      const embed = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`**My prefix is: \`${PREFIX}\`**`);
      message.channel.send({ embeds: [embed] })
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [ matchedPrefix ] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if(!command) return;
    
    if(!message.guild.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES)) return await message.author.dmChannel.send({ content: `I don't have perm  **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute command!` }).catch(() => {});
    if(!message.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) return await message.channel.send({ content: `I don't have perm **\`EMBED_LINKS\`** to execute command!` }).catch(() => {});
    
    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);
        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription("There was an error executing that command.");

        return message.channel.send({ embeds: [embed] });
    }
}