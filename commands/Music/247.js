const { EmbedBuilder } = require('discord.js');
const { Database } = require("st.db");

const GVoice = new Database("./settings/models/voice.json", { databaseInObject: true });

module.exports = {
    name: ["music", "247"],
    description: "24/7 in voice channel",
    category: "Music",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        const db = await GVoice.get(interaction.guild.id);

        if (db.voice_enable === true) {
            await client.createDVoice(interaction);

            const embed = new EmbedBuilder()
                .setDescription(`\`🌙\` | *Mode 24/7 has been:* \`Deactivated\``)
                .setColor(client.color);

            interaction.editReply({ embeds: [embed] });
        } else if (db.voice_enable === false) {
            await client.createEVoice(interaction);

            const embed = new EmbedBuilder()
                .setDescription(`\`🌕\` | *Mode 24/7 has been:* \`Activated\``)
                .setColor(client.color);

            interaction.editReply({ embeds: [embed] });
        }
    }
}