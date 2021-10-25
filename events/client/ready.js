const { MessageEmbed } = require("discord.js");
const figlet = require('figlet');
const chalk = require('chalk');
const { prefix } = require("../../config.json");
const DisTube = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

module.exports = async (client) => {
    figlet(client.user.tag, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.red.bold(data));
    });

    let activity = [
        `${client.guilds.cache.size} Guilds!`, 
        `${client.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0)} | Members!`, 
        `${client.channels.cache.size} | Channels!`], i = 0;

        setInterval(() => client.user.setActivity(`${prefix}help <command> | ${activity[i++ % activity.length]}`, { 
            type: "LISTENING", 
            url: "https://www.twitch.tv/nanotect_" 
        }), 15000)

    client.distube = new DisTube.DisTube(client, {
        emitNewSongOnly: true,
        plugins: [new SoundCloudPlugin(), new SpotifyPlugin()]
    })

    client.distube
        .on("playSong", (queue, song) => {
            const embed = new MessageEmbed()
                .setAuthor(`Starting Playing...`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
                .setDescription(`**[${song.name}](${song.url})**`)
                .setThumbnail(song.thumbnail)
                .setColor('#000001')
                .addField('Uploader:', `[${song.uploader.name}](${song.uploader.url})`, true)
                .addField('Requester:', song.user, true)
                .addField('Current Volume:', queue.volume + "%", true)
                .addField('Filter:', queue.filters.join(", ") || "Normal", true)
                .addField('Autoplay:', queue.autoplay ? "Activated" : "Not Active", true)
                .addField('Total Duration', queue.formattedDuration, true)
                .addField(`Current Duration: \`[0:00 / ${song.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
                .setTimestamp();

        queue.textChannel.send(embed)
        })
        .on("addSong", (queue, song) => {
            const embed = new MessageEmbed()
                .setDescription(`**Queued • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
                .setColor('#000001')

            queue.textChannel.send(embed)
        })
        .on("addList", (queue, playlist) => {
            const embed = new MessageEmbed()
                .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
                .setColor('#000001')

            queue.textChannel.send(embed)
        })
        .on("error", (channel, e) => {
            channel.send(`| An error encountered: ${e}`)
            console.error(e)
        })
        .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
        .on("searchNoResult", message => message.channel.send(`No result found!`))
        .on("finish", queue => {
            const embed = new MessageEmbed()
            .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
            .setColor('#000001');

            queue.textChannel.send(embed)
        })

};
