const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "leave"],
    description: "Make the bot leave the voice channel.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);

        const clientVoice = interaction.guild.members.me.voice.channel;
        const memberVoice = interaction.member.voice.channel;

        if (clientVoice === memberVoice) {
            if (queue) {
                client.distube.stop(interaction);
                client.distube.voices.leave(interaction.guild);
            } else {
                client.distube.voices.leave(interaction.guild);
            }

            const embed = new EmbedBuilder()
                .setDescription(`\`🚫\` | **Left:** | \`${memberVoice.name}\``)
                .setColor(client.color)

            interaction.editReply({ embeds : [embed] });
        }
    }
}
