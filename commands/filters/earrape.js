const { MessageEmbed } = require('discord.js');

module.exports = {
    config: {
        name: "earrape",
        description: "Turning on earrape volume",
        category: "filters",
        accessableby: "Member",
        aliases: ["loud"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        queue.setVolume(1000)

        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Volume charge to:** \`Earrape\``);

        msg.edit({ content: ' ', embeds: [embed] })

    }
};