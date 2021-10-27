const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config.json');
const delay = require('delay');

module.exports = {
    name: "filter",
    category: "Filters",
    aliases: ["f"],
    cooldown: 2,
    description: "Turns on any filter.",
    memberpermissions: ["MANAGE_MEMBERS"],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....")
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        if (args[0] === "off" && queue.filters?.length) queue.setFilter(false)
        else if (Object.keys(client.distube.filters).includes(args[0])) queue.setFilter(args[0])
        else if (args[0]) msg.edit(`Invalid filter!`)

        const embed = new MessageEmbed()
            .setAuthor(`Currently Filter`, `https://cdn.discordapp.com/emojis/741605543046807626.gif`)
            .setDescription(`\🎲 **Filter:** \`${queue.filters.join(", ") || "Normal"}\``)
            .setFooter(`🔩 **Example:** \`${prefix}filter 3d\``)
            .setTimestamp()
            .setColor('#000001');

        await delay(3000)
        msg.edit({ content: ' ', embeds: [embed] })
    } 
}; // testing version