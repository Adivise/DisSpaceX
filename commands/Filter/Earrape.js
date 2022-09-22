const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["filter", "earrape"],
    description: "Turning on Earrape filter",
    category: "Filter",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });;
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        queue.setVolume(1000)

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`🔊\` | **Volume charge to:** \`Earrape\``);

        interaction.editReply({ content: ' ', embeds: [embed] })

    }
};