const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');

module.exports = { 
    config: {
        name: "filter",
        description: "Makes sound bot so weird",
        category: "filters",
        accessableby: "Member",
        aliases: ["filters"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing...")
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        if (args[0] === "off" && queue.filters?.length) queue.setFilter(false)
        else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
        else if (args[0]) msg.edit(`Invalid filter!`)

        const embed = new MessageEmbed()
            .setAuthor(`Currently Filter`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
            .setDescription(`🎲 **Filter:** \`${queue.filters.join(", ") || "Normal"}\``)
            .setFooter(`🔩 **Example:** \`${prefix}filter 3d\``)
            .setTimestamp()
            .setColor('#000001');

        msg.edit('', embed)
    } 
}; // testing version