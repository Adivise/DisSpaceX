const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    config: {
        name: "reset",
        description: "Reseting all filter currently in use",
        category: "filters",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....")
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        queue.filters.clear();
        queue.setVolume(50)

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Filter has been: Reseted', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor('#000001');

        await delay(3000);
        msg.edit({ content: ' ', embeds: [embed] });
    }
}; /// testing version