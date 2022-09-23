const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "seek"],
    description: "Seek timestamp in the song!",
    category: "Music",
    options: [
        {
            name: "seconds",
            description: "The number of seconds to seek the timestamp by.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });
        
        const value = interaction.options.getInteger("seconds");
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if(value >= queue.songs[0].duration || value < 0) return interaction.editReply(`Cannot seek beyond length of song.`);

        await queue.seek(value);

        const embed = new EmbedBuilder()
            .setDescription(`\`⏭\` | *Seeked to:* \`${value}\``)
            .setColor(client.color);

        interaction.editReply({ embeds: [embed] });
    }
}