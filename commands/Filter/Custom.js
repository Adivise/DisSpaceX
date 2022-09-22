const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const delay = require('delay');

module.exports = {
    name: ["filter", "custom"],
    description: "Select your own filter",
    category: "Filter",
    options: [
        {
            name: 'args',
            description: 'Type a filter.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const args = interaction.options.getString('args');
        
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

        if (args === "off" && queue.filters.size) queue.filters.clear();
        else if (Object.keys(client.distube.filters).includes(args)) {
            if (queue.filters.has(args)) queue.filters.remove(args)
            else queue.filters.add(args)
        } else if (args[0]) interaction.editReply(`Invalid filter!`)

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Currently Filter`, iconURL: `https://cdn.discordapp.com/emojis/741605543046807626.gif`})
            .setDescription(`\🎲 **Filter:** \`${queue.filters.names.join(", ") || "Normal"}\``)
            .setFooter({ text: `🔩 **Example:** \`/filter 3d\``})
            .setTimestamp()
            .setColor(client.color);

        await delay(3000)
        interaction.editReply({ content: ' ', embeds: [embed] })
    } 
}; // testing version