const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "loopqueue",
        aliases: ["lq", "loopall"],
        description: "loop the song in queue playing.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (queue.repeatMode === 2) {
                client.distube.setRepeatMode(message, 0);
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)

                msg.edit({ content: ' ', embeds: [embed] });
            } else {
                client.distube.setRepeatMode(message, 2);
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`🔁\` | **Song is loop:** \`All\``)

                msg.edit({ content: ' ', embeds: [embed] });
            }
    }
}
