const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "skipto",
        description: "skipto the song in queue!",
        category: "music",
        accessableby: "Member",
        aliases: ["st"]
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
        const song = parseInt(args[0])
        if (isNaN(song)) return message.channel.send(`Please provide a number`)
        if (Number(song) < 1 || Number(song) > 100) return message.channel.send(`Please provide a number between 1 and 100`)

        client.distube.jump(message, song)
        .then(queue => {
            const embed = new MessageEmbed()
                .setDescription(`\`⏭\` | **Skipto:** ${song}`)
                .setColor("#000001")

            message.channel.send(embed);
        })
    }
};