const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "skip",
        description: "skip the song!",
        category: "music",
        accessableby: "Member",
        aliases: ["s"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        try {
            queue.skip();
            const embed = new MessageEmbed()
                .setDescription("\`⏭\` | **Song has been:** `Skipped`")
                .setColor("#000001")

            msg.edit('', embed);

        } catch (error) {
            console.error(error);
        }
    }
};