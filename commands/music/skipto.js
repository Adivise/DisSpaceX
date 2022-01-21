const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "skipto",
        aliases: ["st"],
        description: "Skip to a song in the queue.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`Please enter a valid number!`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        await client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`⏭\` | **Skipto:** ${args[0]}`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}
