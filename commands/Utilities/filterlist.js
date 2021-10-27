const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json");

module.exports = {
    name: "filterlist",
    category: "Utilities",
    aliases: ["fl"],
    cooldown: 3,
    usage: "filter [name]",
    description: "Display all filters.",

    run: async (client, message) => {
        const msg = await message.channel.send("Processing...");
        const embed = new MessageEmbed()
            .setColor('#000001')
            .setAuthor(`Filter List`, message.guild.iconURL({ dynamic: true }))
            .setDescription(`**Displays all filters that the bot has.**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addField('** **', `\`3d\``, true)
            .addField('** **', `\`bassboost\``, true)
            .addField('** **', `\`echo\``, true)
            .addField('** **', `\`karaoke\``, true)
            .addField('** **', `\`nightcore\``, true)
            .addField('** **', `\`vaporwave\``, true)
            .addField('** **', `\`flanger\``, true)
            .addField('** **', `\`gate\``, true)
            .addField('** **', `\`haas\``, true)
            .addField('** **', `\`reverse\``, true)
            .addField('** **', `\`surround\``, true)
            .addField('** **', `\`mcompand\``, true)
            .addField('** **', `\`phaser\``, true)
            .addField('** **', `\`tremolo\``, true)
            .addField('** **', `\`earwax\``, true)
            .setFooter(`Example: ${prefix}filter bassboost`)
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; // testing version
