const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skip",
        aliases: ["s"],
        description: "Skips the current song.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (queue.songs.length === 1 && queue.autoplay === false) {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

                msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.skip(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#000001")
                        .setDescription("\`⏭\` | **Song has been:** `Skipped`")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        }
    }
}