const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue, song) => {
    let embed = new EmbedBuilder()
    .setDescription(`**Queued • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
    .setColor('#000001')

    queue.textChannel.send({ content: ' ', embeds: [embed] })
}