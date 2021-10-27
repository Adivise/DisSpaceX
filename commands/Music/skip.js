const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "Music",
    aliases: ["s"],
    cooldown: 3,
    description: "Skip the song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        if (queue.songs.length === 1) {
            message.client.distube.stop(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#000001")
                        .setDescription("\`⏭\` | **Song has been:** `Skipped`")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        } else {
            message.client.distube.skip(message)
                .then(song => {
                    const embed = new MessageEmbed()
                        .setColor("#000001")
                        .setDescription("\`⏭\` | **Song has been:** `Skipped`")

                    msg.edit({ content: ' ', embeds: [embed] });
                });
        }
    }
}
