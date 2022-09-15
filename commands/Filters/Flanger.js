const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    config: {
        name: "flager",
        description: "Turning on flager filter",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Processing.....")
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        queue.filters.add("flanger")

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Turned on: Flanger', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: ' ', embeds: [embed] })
    }
}; /// testing version