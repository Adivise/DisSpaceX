const lyricsfinder = require('lyrics-finder');
const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "lyrics",
    category: "Music",
    aliases: [],
    cooldown: 3,
    description: "Display lyrics current song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Searching for lyrics...");
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)

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

        msg.edit({ content: ' ', embeds: [lyricsEmbed] })
        .then(n => {
            var total = queue.songs[0].duration * 1000;
            var current = queue.currentTime * 1000;
            let time = total - current;
            setTimeout(() => { msg.delete(); }, time);
        });
    }
};