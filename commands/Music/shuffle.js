const { MessageEmbed } = require('discord.js');

module.exports = { 
    name: "shuffle",
    category: "Music",
    aliases: ["random", "mix"],
    cooldown: 3,
    description: "shuffle queue",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)

            client.distube.shuffle(message);

			let embed = new MessageEmbed()
				.setColor('#000001')
				.setDescription(`\`🔀\` | **Song has been:** \`Shuffle\``);

			msg.edit({ content: ' ', embeds: [embed] });
    }
};