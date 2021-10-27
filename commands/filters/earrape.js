const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "earrape",
    category: "Filters",
    aliases: ["loud"],
    cooldown: 2,
    description: "Turns on Earrape filter.",
    memberpermissions: ["MANAGE_MEMBERS"],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        queue.setVolume(1000)

        const embed = new MessageEmbed()
            .setColor("#000001")
            .setDescription(`\`🔊\` | **Volume charge to:** \`Earrape\``);

        msg.edit({ content: ' ', embeds: [embed] })

    }
};