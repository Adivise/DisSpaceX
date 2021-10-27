const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    category: "Music",
    aliases: ["st"],
    cooldown: 3,
    usege: "skipto <queue>",
    description: "Skipto the song in queue!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        if (isNaN(args[0])) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`Please enter a valid number!`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        message.client.distube.jump(message, parseInt(args[0]))
            .then(queue => {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`\`⏭\` | **Skipto:** ${args[0]}`)

                msg.edit({ content: ' ', embeds: [embed] });
            });
    }
}
