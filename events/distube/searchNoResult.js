const { MessageEmbed } = require("discord.js");

module.exports = async (client, query, queue) => {
    const embed = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`No result found for ${query}!`)

    queue.textChannel.send({ embeds: [embed] })
}