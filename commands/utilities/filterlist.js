const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "filterlist",
        aliases: ["fl"],
        usage: "(command)",
        category: "utilities",
        description: "Displays all filters that the bot has.",
        accessableby: "Members"
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Processing...");
        const embed = new MessageEmbed()
            .setColor('#000001')
            .setAuthor({ name: `Filter List`, iconURL: message.guild.iconURL({ dynamic: true })})
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
            .setFooter({ text: `Example: ${client.prefix}filter bassboost`})
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; // testing version
