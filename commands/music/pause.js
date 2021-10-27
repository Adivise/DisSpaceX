const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "pause",
    category: "Music",
    aliases: ["pa"],
    cooldown: 3,
    description: "Pause the song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Precessing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");
		
		if (queue.paused) { 
			const embed = new MessageEmbed()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Queue has been:** \`Paused\``);

			msg.edit({ content: ' ', embeds: [embed] });
		} else {
			client.distube.pause(message);
			const embed = new MessageEmbed()
				.setColor("#000001")
                .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

			msg.edit({ content: ' ', embeds: [embed] });
		}
    }
}
