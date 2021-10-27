const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "join",
    category: "Music",
    aliases: ["cmon", "summon"],
    cooldown: 3,
    description: "Join Voice Channel.",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`You must be in the same channel as ${message.client.user}`);

				return msg.edit({ content: ' ', embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`I'm already on your voice channel`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new MessageEmbed()
							.setColor('#000001')
							.setDescription(`\`🔊\` | **Joined:** \`${memberVoice.name}\``)

                        msg.edit({ content: ' ', embeds: [embed] });
					})
					.catch(error => {
						console.log(e);
					})

				
			} else {
				const embed = new MessageEmbed()
					.setColor("#000001")
					.setDescription(`You must be in a voice channel!`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		}

    }
}
