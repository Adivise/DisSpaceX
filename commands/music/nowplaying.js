const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    category: "Music",
    aliases: ["np", "now"],
    cooldown: 3,
    description: "Display currently song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send('Processing.....');
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        const uni = `${queue.songs[0].playing ? '⏸️ |' : '🔴 |'}`;
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

        const embed = new MessageEmbed()
            .setAuthor(queue.songs[0].playing ? 'Song Pause...' : 'Now Playing...', "https://cdn.discordapp.com/emojis/741605543046807626.gif")
            .setColor('#000001')
            .setDescription(`**[${queue.songs[0].name}](${queue.songs[0].url})**`)
            .setThumbnail(`${queue.songs[0].thumbnail}`)
            .addField('Uploader:', `[${queue.songs[0].uploader.name}](${queue.songs[0].uploader.url})`, true)
            .addField('Requester:', `${queue.songs[0].user}`, true)
            .addField('Volume:', `${queue.volume}%`, true)
            .addField('Views', `${queue.songs[0].views}`, true)
            .addField('Likes:', `${queue.songs[0].likes}`, true)
            .addField('Dislikes:', `${queue.songs[0].dislikes}`, true)
            .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${queue.songs[0].formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
            .setTimestamp()

        msg.edit({ content: ' ', embeds: [embed] });
    }
}
