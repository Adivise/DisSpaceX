const { EmbedBuilder } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: ["filter", "nightcore"],
    description: "Turning on Nightcore filter",
    category: "Filter",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        queue.filters.add("nightcore")

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Turned on: Nightcore', iconURL: 'https://cdn.discordapp.com/emojis/758423098885275748.gif'})
            .setColor(client.color);

        await delay(5000);
        interaction.editReply({ content: ' ', embeds: [embed] })
    }
}; /// testing version