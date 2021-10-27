const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: "reset",
    category: "Filters",
    aliases: [],
    cooldown: 2,
    description: "Reset filter to normal.",
    memberpermissions: ["MANAGE_MEMBERS"],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....")
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        client.distube.setFilter(message, false)
        queue.setVolume(50)

        const embed = new MessageEmbed()
            .setAuthor('Filter has been: Reseted', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(3000);
        msg.edit({ content: ' ', embeds: [embed] });
    }
}; /// testing version