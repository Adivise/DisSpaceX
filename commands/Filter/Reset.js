const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: ["filter", "reset"],
    description: "Reset all filters",
    category: "Filter",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        queue.filters.clear();
        queue.setVolume(50)

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Filter has been: Reseted', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor(client.color);

        await delay(3000);
        interaction.editReply({ content: ' ', embeds: [embed] });
    }
}; /// testing version