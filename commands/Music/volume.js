const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    category: "Music",
    aliases: ["vol", "v"],
    cooldown: 3,
    usage: "volume <number>",
    description: "Skip the song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`Current **volume** : \`${queue.volume}\`%`)

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (isNaN(volume)) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`Please enter a valid number`);

            return msg.edit({ content: ' ', embeds: [embed] });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return msg.edit(`Please provide a number between 1 and 100`)

        client.distube.setVolume(message, volume);

        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Change volume to:** \`${args[0]}\`%`)

        msg.edit({ content: ' ', embeds: [embed] });

    }
}
