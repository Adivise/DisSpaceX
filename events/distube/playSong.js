const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue, song) => {
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
}