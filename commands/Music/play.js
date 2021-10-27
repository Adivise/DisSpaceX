const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "Music",
    aliases: ["pp", "p"],
    cooldown: 3,
    usage: "play <song name or link etc.>",
    description: "Playing music from souce.",
    memberpermissions: [],

    run: async (client, message, args) => {
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        const string = args.join(" ");
        if (!string) {
            return message.channel.send("Please provide a song name or link.");
        }

        if (clientVoice) {
            if (clientVoice === memberVoice) {
                client.distube.play(message, string);
            } else {
                const embed = new MessageEmbed()
                    .setColor("#000001")
                    .setDescription(`You must be in the same channel as ${message.client.user}`);
                message.channel.send({ embeds: [embed] });
            }
        } else {
            client.distube.play(message, string);
        }

    }
}
