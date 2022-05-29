const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, result, query) => {
    let i = 0
    let embed = new MessageEmbed()
        .setColor("#000001")
        .setTitle(`Song Selection...`)
        .setDescription(`${result.map(song => `**(${++i}.) [${song.name}](${song.url})** - \`${song.formattedDuration}\``).join("\n")}`)
        .setFooter({ text: `Please select a song in 30 seconds.` });

    message.channel.send({ embeds: [embed] });
}