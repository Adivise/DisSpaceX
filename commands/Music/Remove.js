const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "remove"],
    description: "Remove song from queue!",
    category: "Music",
    options: [
        {
            name: "position",
            description: "The position in queue want to remove.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const tracks = interaction.options.getInteger("position");
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (tracks == 0) return interaction.editReply(`Cannot remove a song already playing.`);
        if (tracks > queue.songs.length) return interaction.editReply(`Song not found.`);

        const song = queue.songs[tracks];

        await queue.songs.splice(tracks, 1);

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`**Removed • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)

        interaction.editReply({ content: " ", embeds: [embed] });
    }
}