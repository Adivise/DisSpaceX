const { EmbedBuilder } = require("discord.js");

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
        const embed = new EmbedBuilder()
            .setColor('#000001')
            .setAuthor({ name: `Filter List`, iconURL: message.guild.iconURL({ dynamic: true })})
            .setDescription(`**Displays all filters that the bot has.**`)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .addFields({ name: '** **', value: `\`3d\``, inline: true })
            .addFields({ name: '** **', value: `\`bassboost\``, inline: true })
            .addFields({ name: '** **', value: `\`echo\``, inline: true })
            .addFields({ name: '** **', value: `\`karaoke\``, inline: true })
            .addFields({ name: '** **', value: `\`nightcore\``, inline: true })
            .addFields({ name: '** **', value: `\`vaporwave\``, inline: true })
            .addFields({ name: '** **', value: `\`flanger\``, inline: true })
            .addFields({ name: '** **', value: `\`gate\``, inline: true })
            .addFields({ name: '** **', value: `\`haas\``, inline: true })
            .addFields({ name: '** **', value: `\`reverse\``, inline: true })
            .addFields({ name: '** **', value: `\`surround\``, inline: true })
            .addFields({ name: '** **', value: `\`mcompand\``, inline: true })
            .addFields({ name: '** **', value: `\`phaser\``, inline: true })
            .addFields({ name: '** **', value: `\`tremolo\``, inline: true })
            .addFields({ name: '** **', value: `\`earwax\``, inline: true })
            .setFooter({ text: `Example: ${client.prefix}filter bassboost` })
            .setTimestamp()

            msg.edit({ content: ' ', embeds: [embed] })
        }
}; // testing version
