const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = { 
    name: ["Context | Skip"],
    type: ApplicationCommandType.Message,
    category: "Context",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (queue.songs.length === 1 && queue.autoplay === false) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")

            interaction.editReply({ embeds: [embed] });
        } else { 
            await client.distube.skip(interaction);
            
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription("\`⏭\` | **Song has been:** `Skipped`")

            interaction.editReply({ embeds: [embed] });
        }
    }
}