const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, queue, track) => {
  var newQueue = client.distube.getQueue(queue.id)
  var data = disspace(newQueue, track)

  const nowplay = await queue.textChannel.send(data)

  const filter = (message) => {
    if (message.guild.me.voice.channel && message.guild.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({ content: "You need to be in a same/voice channel.", ephemeral: true });
    }
  };
  const collector = nowplay.createMessageComponentCollector({ filter, time: 120000 });

  collector.on('collect', async (message) => {
    const id = message.customId;
    const queue = client.distube.getQueue(message.guild.id);
    if (id === "pause") {
      if (!queue) {
        collector.stop();
      }
      if (queue.paused) {
        await client.distube.resume(message.guild.id);
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.pause(message.guild.id);
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "skip") {
      if (!queue) {
        collector.stop();
      }
      if (queue.songs.length === 1 && queue.autoplay === false) {
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.skip(message)
          .then(song => {
            const embed = new MessageEmbed()
              .setColor("#000001")
              .setDescription("\`⏭\` | **Song has been:** `Skipped`")

            nowplay.edit({ components: [] });
            message.reply({ embeds: [embed], ephemeral: true });
          });
      }
    } else if (id === "stop") {
      if (!queue) {
        collector.stop();
      }

      await client.distube.stop(message.guild.id);

      const embed = new MessageEmbed()
        .setDescription(`\`🚫\` | **Song has been:** | \`Stopped\``)
        .setColor('#000001');

      await nowplay.edit({ components: [] });
      message.reply({ embeds: [embed], ephemeral: true });
    } else if (id === "loop") {
      if (!queue) {
        collector.stop();
      }
      if (queue.repeatMode === 0) {
        client.distube.setRepeatMode(message.guild.id, 1);
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        client.distube.setRepeatMode(message.guild.id, 0);
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription(`\`🔁\` | **Song is unloop:** \`Current\``)

        message.reply({ embeds: [embed], ephemeral: true });
      }
    } else if (id === "previous") {
      if (!queue) {
        collector.stop();
      }
      if (queue.previousSongs.length == 0) {
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription("\`🚨\` | **There are no** `Previous` **songs**")

        message.reply({ embeds: [embed], ephemeral: true });
      } else {
        await client.distube.previous(message)
        const embed = new MessageEmbed()
          .setColor("#000001")
          .setDescription("\`⏮\` | **Song has been:** `Previous`")

        nowplay.edit({ components: [] });
        message.reply({ embeds: [embed], ephemeral: true });
      }
    }
  });
  collector.on('end', async (collected, reason) => {
    if (reason === "time") {
      nowplay.edit({ components: [] });
    }
  });
}

function disspace(nowQueue, nowTrack) {
  const embeded = new MessageEmbed()
    .setAuthor({ name: `Starting Playing...`, iconURL: 'https://cdn.discordapp.com/emojis/741605543046807626.gif' })
    .setThumbnail(nowTrack.thumbnail)
    .setColor('#000001')
    .setDescription(`**[${nowTrack.name}](${nowTrack.url})**`)
    .addField(`Uploader:`, `**[${nowTrack.uploader.name}](${nowTrack.uploader.url})**`, true)
    .addField(`Requester:`, `${nowTrack.user}`, true)
    .addField(`Current Volume:`, `${nowQueue.volume}%`, true)
    .addField(`Filters:`, `${nowQueue.filters.join(", ") || "Normal"}`, true)
    .addField(`Autoplay:`, `${nowQueue.autoplay ? "Activated" : "Not Active"}`, true)
    .addField(`Total Duration:`, `${nowQueue.formattedDuration}`, true)
    .addField(`Current Duration: \`[0:00 / ${nowTrack.formattedDuration}]\``, `\`\`\`🔴 | 🎶──────────────────────────────\`\`\``)
    .setTimestamp()

  const row = new MessageActionRow()
    .addComponents(
      new MessageButton()
        .setCustomId("pause")
        .setLabel(`Pause`)
        .setEmoji("⏯")
        .setStyle("SUCCESS")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("previous")
        .setLabel(`Previous`)
        .setEmoji("⬅")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("stop")
        .setLabel(`Stop`)
        .setEmoji("✖")
        .setStyle("DANGER")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("skip")
        .setLabel(`Skip`)
        .setEmoji("➡")
        .setStyle("PRIMARY")
    )
    .addComponents(
      new MessageButton()
        .setCustomId("loop")
        .setLabel(`Loop`)
        .setEmoji("🔄")
        .setStyle("SUCCESS")
    )
  return {
    embeds: [embeded],
    components: [row]
  }
}