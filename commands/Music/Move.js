const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "move"],
    description: "Move position song in queue!",
    category: "Music",
    options: [
        {
            name: "queue",
            description: "The queue of the song",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "position",
            description: "The position in queue want to move too.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const tracks = interaction.options.getInteger("queue");
        const position = interaction.options.getInteger("position");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (tracks == 0) return interaction.editReply(`Cannot move a song already playing.`);
        if (position == 0) return interaction.editReply(`Cannot move to this position a song already playing.`);
        if (tracks > queue.songs.length) return interaction.editReply(`Queue | Song not found.`);
        if (position > queue.songs.length) return interaction.editReply(`Position | Song not found.`);

        const song = queue.songs[tracks];

        await queue.songs.splice(tracks);
        await queue.addToQueue(song, position);

        const embed = new EmbedBuilder()
            .setDescription(`**Moved • [${song.name}](${song.url})** to ${position}`)
            .setColor(client.color)

        interaction.editReply({ embeds: [embed] });
    }
}