const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = { 
    name: ["Context | Stop"],
    type: ApplicationCommandType.Message,
    category: "Context",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
		if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        await client.distube.voices.leave(interaction.guild);

        const embed = new EmbedBuilder()
            .setDescription(`\`🚫\` | **Left:** | \`${channel.name}\``)
            .setColor(client.color)

        interaction.editReply({ embeds : [embed] });
    }
}