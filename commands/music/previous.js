const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "previous",
    category: "Music",
    aliases: [],
    cooldown: 3,
    description: "Previous the song",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        client.distube.previous(message)
            .then(song => {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription("\`⏭\` | **Song has been:** `Previoused`")

                msg.edit({ content: ' ', embeds: [embed] });
            });

    }
}
