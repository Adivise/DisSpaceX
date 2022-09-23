const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "join"],
    description: "Make the bot join the voice channel.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

		const queue = client.distube.getQueue(interaction);
		if (queue) return interaction.editReply(`I already playing in voice channel.`);
		const { channel } = interaction.member.voice;
		if(!channel) return interaction.editReply(`You need to be in voice channel.`);

		await client.distube.voices.join(interaction.member.voice.channel);

		const embed = new EmbedBuilder()
			.setColor(client.color)
			.setDescription(`\`🔊\` | **Joined:** \`${channel.name}\``)

		interaction.editReply({ embeds: [embed] });
    }
}
