const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "volume",
        description: "change the volume of song!",
        category: "music",
        accessableby: "Member",
        aliases: ["vol"]
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
            if (!queue) return message.channel.send(`There is nothing in the queue right now!`)

        const volume = parseInt(args[0])
            if (isNaN(volume)) return message.channel.send(`Please provide a number between 1 and 100`)
            if (Number(volume) < 1 || Number(volume) > 100) return message.channel.send(`Please provide a number between 1 and 100`)

        queue.setVolume(volume)

        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Change volume to:** \`${volume}\``);

        message.channel.send(embed);

    }
};