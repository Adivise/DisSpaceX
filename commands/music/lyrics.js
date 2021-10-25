const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "lyrics",
        description: "see lyrics the song!",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: []
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Searching for lyrics...");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)

        let song = args.join(" ");
            let CurrentSong = queue.songs[0];
        if (!song && CurrentSong) song = CurrentSong.name;

        let lyrics = null;

        try {
            lyrics = await lyricsfinder(song, "");
            if (!lyrics) msg.edit("Couldn't find any lyrics for that song!");
        } catch (err) {
            console.log(err);
            msg.edit("Couldn't find any lyrics for that song!");
        }
        let lyricsEmbed = new MessageEmbed()
            .setColor('#000001')
            .setTitle(`Lyrics`)
            .setDescription(`**${song}**\n${lyrics}`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp();

        if (lyrics.length > 2048) {
            lyricsEmbed.setDescription("Lyrics too long to display!");
        }

        msg.edit('', lyricsEmbed)
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};