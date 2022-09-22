const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: ["music", "skipto"],
    description: "Skips to a certain song in the queue.",
    category: "Music",
    options: [
        {
            name: "position",
            description: "The position of the song in the queue.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const args = interaction.options.getInteger("position");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.");

        if ((args > queue.songs.length) || (args && !queue.songs[args])) return interaction.editReply("Song not found.");

        await client.distube.jump(interaction, args)
        
        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`⏭\` | **Skipto:** ${args}`)

        interaction.editReply({ embeds: [embed] });
    }
}
