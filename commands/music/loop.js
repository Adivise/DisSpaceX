const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loopqueue",
    category: "Music",
    aliases: ["lq"],
    cooldown: 3,
    description: "make song to loop",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

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
