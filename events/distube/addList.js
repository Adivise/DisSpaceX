const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, playlist) => {
    const embed = new EmbedBuilder()
        .setDescription(`**Queued • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} tracks) • ${playlist.user}`)
        .setColor('#000001')
  
      queue.textChannel.send({ embeds: [embed] })
}