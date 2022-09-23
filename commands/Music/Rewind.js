const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "rewind"],
    description: "Rewind timestamp in the song!",
    category: "Music",
    options: [
        {
            name: "seconds",
            description: "The number of seconds to rewind the timestamp by.",
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const value = interaction.options.getInteger("seconds");
            
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (!value) {
            if((queue.currentTime - 10) > 0) {

                await queue.seek(queue.currentTime - 10);
                
                const embed = new EmbedBuilder()
                    .setDescription(`\`⏮\` | *Rewind to:* \`${queue.formattedCurrentTime}\``)
                    .setColor(client.color);

                interaction.editReply({ embeds: [embed] });

            } else {
                interaction.editReply(`Cannot rewind beyond the song's duration.`);
            }
        } else if ((queue.currentTime - value) > 0) {

            await queue.seek(queue.currentTime - value);
            
            const embed = new EmbedBuilder()
                .setDescription(`\`⏮\` | *Rewind to:* \`${queue.formattedCurrentTime}\``)
                .setColor(client.color);

            interaction.editReply({ embeds: [embed] });

        } else { 
            interaction.editReply(`Cannot rewind beyond the song's duration.`);
        }
    }
}