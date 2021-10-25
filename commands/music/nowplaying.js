const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "nowplaying",
        description: "see nowplaying",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["what", "np"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send('Processing.....');
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");


        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const csong = queue.songs[0];
        const uni = csong.playing ? '⏸️ |' : '🔴 |';
        const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);


        const embed = new MessageEmbed()
            .setAuthor(csong.playing ? 'Song Pause...' : 'Now Playing...', "https://cdn.discordapp.com/emojis/741605543046807626.gif")
            .setColor('#000001')
            .setDescription(`**[${csong.name}](${csong.url})**`)
            .setThumbnail(csong.thumbnail)
            .addField('Uploader:', `[`+ csong.uploader.name + `]` + `(` + csong.uploader.url + `)`, true)
            .addField('Requester:', csong.user, true)
            .addField('Volume:', queue.volume + "%", true)
            .addField('Views', csong.views, true)
            .addField('Likes:', csong.likes, true)
            .addField('Dislikes:', csong.dislikes, true)
            .addField(`Current Duration: \`[${queue.formattedCurrentTime} / ${csong.formattedDuration}]\``, `\`\`\`${uni} ${'─'.repeat(part) + '🎶' + '─'.repeat(30 - part)}\`\`\``)
            .setTimestamp();

        msg.edit('', embed);
    }
};