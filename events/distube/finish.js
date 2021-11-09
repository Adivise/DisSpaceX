const { MessageEmbed } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new MessageEmbed()
        .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
        .setColor('#000001')

    queue.textChannel.send({ embeds: [embed] })
}