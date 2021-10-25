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
        const msg = await message.channel.send("Processing.....");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor('#000001')
                .setDescription(`Please enter a valid number!`);
            msg.edit('', embed);
        }

        client.distube.jump(message, parseInt(args[0]))
        .then(queue => {
            const embed = new MessageEmbed()
                .setDescription(`\`⏭\` | **Skipto:** ${args[0]}`)
                .setColor("#000001")

            msg.edit('', embed);
        })
    }
};