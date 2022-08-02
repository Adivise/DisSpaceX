const { EmbedBuilder } = require("discord.js");

module.exports = async (client, queue) => {
    const embed = new EmbedBuilder()
        .setDescription(`\`📛\` | **Song has been:** \`Ended\``)
        .setColor('#000001')

    queue.textChannel.send({ embeds: [embed] })
}