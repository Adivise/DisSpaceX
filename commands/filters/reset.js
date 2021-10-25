const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = { 
    config: {
        name: "reset",
        description: "Makes sound bot to normal",
        category: "filters",
        accessableby: "Member",
        aliases: []
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
        client.distube.setFilter(message, false)
        queue.setVolume(50)

        const embed = new MessageEmbed()
            .setAuthor('Filter has been: Reseted', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(3000);
        msg.edit('', embed)
    }
}; /// testing version