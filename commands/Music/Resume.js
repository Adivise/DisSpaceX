const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "resume"],
    description: "Resume the music.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")
		
		if (queue.paused) { 
			await client.distube.resume(interaction);

			const embed = new EmbedBuilder()
				.setColor(client.color)
				.setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);

			interaction.editReply({ embeds: [embed] });
			client.UpdateQueueMsg(queue);
		} else {
			await client.distube.pause(interaction);

			const embed = new EmbedBuilder()
				.setColor(client.color)
				.setDescription(`\`⏯\` | **Song has been:** \`Paused\``);

			interaction.editReply({ embeds: [embed] });
			client.UpdateQueueMsg(queue);
		}
    }
}
