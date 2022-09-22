const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    await client.UpdateMusic(queue);

    const embed = new EmbedBuilder()
        .setColor('#000001')
        .setDescription(`**Channel is Empty!**`)

    queue.textChannel.send({ embeds: [embed] })
}