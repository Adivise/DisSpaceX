const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: ["music", "join"],
    description: "Make the bot join the voice channel.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

		const { channel } = interaction.member.voice;
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        const clientVoice = interaction.guild.members.me.voice.channel;
        const memberVoice = interaction.member.voice.channel;
		
		if (clientVoice) {
			if (clientVoice !== memberVoice) {
				const embed = new EmbedBuilder()
					.setColor(client.color)
					.setDescription(`You must be in the same channel as ${interaction.client.user}`);

				return interaction.editReply({ embeds: [embed] });
			} else {
				const embed = new EmbedBuilder()
					.setColor(client.color)
					.setDescription(`I'm already on your voice channel`);

				return interaction.editReply({ embeds: [embed] });
			}
		} else {
			if (memberVoice) {
				client.distube.voices.join(memberVoice)
				const embed = new EmbedBuilder()
					.setColor(client.color)
					.setDescription(`\`🔊\` | **Joined:** \`${memberVoice.name}\``)

				interaction.editReply({ embeds: [embed] });
			} else {
				const embed = new EmbedBuilder()
					.setColor(client.color)
					.setDescription(`You must be in a voice channel!`);

				return interaction.editReply({ embeds: [embed] });
			}
		}
    }
}
