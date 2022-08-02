const { EmbedBuilder } = require("discord.js");

module.exports = async (client, query, queue) => {
    const embed = new EmbedBuilder()
        .setColor("#000001")
        .setDescription(`No result found for ${query}!`)

    queue.textChannel.send({ embeds: [embed] })
}