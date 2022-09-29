const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");
const ytsr = require("@distube/ytsr");

const SStats = new Database("./settings/models/chart.json", { databaseInObject: true });

module.exports = {
    name: ["topchart"],
    description: "Display top song most recent playable.",
    category: "Utilities",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const all = SStats.all().slice(0, 10);

        all.sort((a, b) => {
            return b.data - a.data;
        });

        var index = 0;

        for (let i = 0; i < all.length; i++) {
            const total = all[i].data;
            index = (index + total)
        }

        const TopChart = [];
        for (let i = 0; i < all.length; i++) {
            const format = `https://youtu.be/${all[i].ID}`;
            const search = await ytsr(format, { limit: 1 });
            const track = search.items[0]; 

            TopChart.push(
                `**${i + 1}.** [${track.name}](${track.url}) | **Playable:** \`${all[i].data}\`
                `)
        }

        const str = TopChart.join('');

        const embed = new EmbedBuilder()
            .setColor(client.color)
            .setAuthor({ name: `Top Charts`, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setDescription(`${str == '' ? '  No Playable' : '\n' + str}`)
            .setFooter({ text: `Total Song • ${SStats.all().length} | Total Playable • ${index}` })


        return interaction.editReply({ embeds: [embed] })
    }
}