const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: ["music", "autoplay"],
    description: "Toggle autoplay music in guild.",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(interaction);
    
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`⏯\` Activate **Autoplay** mode.`);

            interaction.editReply({ embeds: [embed] });
        } else {
            client.distube.toggleAutoplay(interaction);

            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`⏯\` Disable **Autoplay** mode.`);

            interaction.editReply({ embeds: [embed] });
        }
    }
}
