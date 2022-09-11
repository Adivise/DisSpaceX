const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "join",
        aliases: ["summon"],
        description: "Makes the bot join the voice channel.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");

		const { channel } = message.member.voice;
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Connect)) return message.channel.send(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!message.guild.members.cache.get(client.user.id).permissionsIn(channel).has(PermissionsBitField.Flags.Speak)) return message.channel.send(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        const clientVoice = message.guild.members.me.voice.channel;
        const memberVoice = message.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`You must be in the same channel as ${message.client.user}`);

				return msg.edit({ content: ' ', embeds: [embed] });
			} else {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`I'm already on your voice channel`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
					.then(voice => {
						const embed = new EmbedBuilder()
							.setColor('#000001')
							.setDescription(`\`🔊\` | **Joined:** \`${memberVoice.name}\``)

                        msg.edit({ content: ' ', embeds: [embed] });
					})
					.catch(error => {
						console.log(e);
					})

				
			} else {
				const embed = new EmbedBuilder()
					.setColor("#000001")
					.setDescription(`You must be in a voice channel!`);

				return msg.edit({ content: ' ', embeds: [embed] });
			}
		}
    }
}
