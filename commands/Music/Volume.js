const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: ["music", "volume"],
    description: "Adjusts the volume of the bot.",
    category: "Music",
    options: [
        {
            name: "amount",
            description: "The amount of volume to set the bot to.",
            type: ApplicationCommandOptionType.Integer,
            required: false,
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const volume = interaction.options.getInteger("amount");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (!volume) {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`Current **volume** : \`${queue.volume}\`%`)

            return interaction.editReply({ embeds: [embed] });
        }

        if (volume < 1 || volume > 100) return interaction.editReply(`Please provide a number between 1 and 100`)

        await client.distube.setVolume(interaction, volume);

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`🔊\` | **Change volume to:** \`${volume}\`%`)

        interaction.editReply({ embeds: [embed] });
    }
}
