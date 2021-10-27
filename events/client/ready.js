const figlet = require('figlet');
const chalk = require('chalk');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { MessageEmbed } = require('discord.js');
const DisTube = require('distube');

module.exports = async (client) => {
  figlet(client.user.tag, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(chalk.red.bold(data));
  });

 client.distube = new DisTube.DisTube(client, {
    searchSongs: 0,
    searchCooldown: 30,
    leaveOnEmpty: true,
    emptyCooldown: 0,
    leaveOnFinish: true,
    leaveOnStop: true,
    plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
    ytdlOptions: {
      highWaterMark: 1 << 24,
      quality: 'highestaudio'
    },
});

  client.distube
    .on("playSong", (queue, song) => {
      const upsong = `**[${song.uploader.name}](${song.uploader.url})**`

      const embed = new MessageEmbed()
        .setAuthor(`Starting Playing...`, 'https://cdn.discordapp.com/emojis/741605543046807626.gif')
        .setThumbnail(song.thumbnail)
        .setColor('#000001')
        .setDescription(`**[${song.name}](${song.url})**`)
        .addField(`Uploader:`, `${upsong}`, true)
        .addField(`Requester:`, `${song.user}`, true)
        .addField(`Current Volume:`, `${queue.volume}%`, true)
        .addField(`Filters:`, `${queue.filters.join(", ") || "Normal"}`, true)
        .addField(`Autoplay:`, `${queue.autoplay ? "Activated" : "Not Active"}`, true)
        .addField(`Total Duration:`, `${queue.formattedDuration}`, true)
        .addField(`Current Duration: \`[0:00 / ${song.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
        .setTimestamp()

    queue.textChannel.send({ embeds: [embed] })
})
    .on("addSong", async (queue, song) => {
      const msg = await queue.textChannel.send(`Processing.....`)
      let embed = new MessageEmbed()
      .setDescription(`**Queued • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
      .setColor('#000001')

    msg.edit({ content: ' ', embeds: [embed] })
})
    .on("searchResult", (message, result) => {
      let i = 0
      let embed = new MessageEmbed()
        .setAuthor(`Song Selection...`, message.guild.iconURL({ dynamic: true }))
        .setColor('#000001')
        .setDescription(`${result.map(song => `**(${++i}.) [${song.name}](${song.url})** - \`${song.formattedDuration}\` Uploader: \`${song.uploader.name}\``).join("\n")}`)
        .setFooter(`Please type 1-10 select the song in 30s type cancel to Cancel`);

    message.channel.send({ embeds: [embed] })
})
    .on("searchCancel", message => message.channel.send(`Searching canceled`))
    .on('searchInvalidAnswer', message =>	message.channel.send(`searchInvalidAnswer`))
    .on("addList", (queue, playlist) => {
      let embed = new MessageEmbed()
        .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#000001')

    queue.textChannel.send({ embeds: [embed] })
})
    .on("empty", channel => channel.send("Voice channel is empty! Leaving the channel..."))
    .on("searchNoResult", message => message.channel.send(`No result found!`))
    .on("finish", queue => {
      let embed = new MessageEmbed()
        .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
        .setColor('#000001')
    queue.textChannel.send({ embeds: [embed] })
})
  //  .on("disconnect", queue => queue.textChannel.send('Disconnected!'))

}
