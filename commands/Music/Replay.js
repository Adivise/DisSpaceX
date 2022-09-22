const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "replay"],
    description: "Replay the current song.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        await queue.seek(0)

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription("\`🔁\` | **Song has been:** `Replay`")

        interaction.editReply({ embeds: [embed] });
        
    }
}
