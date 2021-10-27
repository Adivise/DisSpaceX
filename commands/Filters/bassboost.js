const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: "bassboost",
    category: "Filters",
    aliases: ["bb"],
    cooldown: 2,
    description: "Turns on Bassboost filter.",
    memberpermissions: ["MANAGE_MEMBERS"],

    run: async (client, message) => {
        const msg = await message.channel.send("Processing.....")
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        client.distube.setFilter(message, "bassboost")

        const embed = new MessageEmbed()
            .setAuthor('Turned on: Bassboost', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit({ content: ' ', embeds: [embed] })
    }
}; /// testing version