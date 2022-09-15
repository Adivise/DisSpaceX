const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "nowplaying",
        aliases: ["np", "now"],
        description: "Displays the current song playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
		const msg = await message.channel.send('Processing.....');

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new EmbedBuilder()
            .setAuthor({ name: queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', iconURL: "https://cdn.discordapp.com/emojis/741605543046807626.gif"})
            .setColor('#000001')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addFields({ name: 'Uploader:', value: `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, inline: true })
            .addFields({ name: 'Requester:', value: `${queue.songs[0].user}`, inline: true })
            .addFields({ name: 'Volume:', value: `${queue.volume}%`, inline: true })
            .addFields({ name: 'Views', value: `${queue.songs[0].views}`, inline: true })
            .addFields({ name: 'Likes:', value: `${queue.songs[0].likes}`, inline: true })
            .addFields({ name: 'Filters:', value: `${queue.filters.names.join(', ') || "Normal"}`, inline: true })
            .addFields({ name: `Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, value: `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``, inline: false })
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
