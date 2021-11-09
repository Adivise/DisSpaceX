const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
    .setColor('#000001')
    .setDescription(`**Channel is Empty!**`)

    queue.textChannel.send({ embeds: [embed] })
}