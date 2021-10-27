const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    category: "Music",
    aliases: ["re"],
    cooldown: 3,
    description: "Resume the song!",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Precessing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
		const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");
		
		if (queue.paused) { 
			client.distube.resume(message);

			const embed = new MessageEmbed()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);

			msg.edit({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor("#000001")
				.setDescription(`\`⏯\` | **Queue has been:** \`Resumed\``);

			msg.edit({ embeds: [embed] });
		}
    }
}
