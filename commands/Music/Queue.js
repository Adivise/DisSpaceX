const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { QueuePage } = require('../../structures/PageQueue.js');

module.exports = {
    name: ["queue"],
    description: "Show the queue of songs.",
    category: "Music",
    options: [
        {
            name: "page",
            description: "Page number to show.",
            type: ApplicationCommandOptionType.Integer,
            required: false,
        }
    ],
    run: async (client, interaction) => {
		await interaction.deferReply({ ephemeral: false });

		const args = interaction.options.getInteger("page");

        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.editReply(`There is nothing in the queue right now!`);
        const { channel } = interaction.member.voice;
        if (!channel || interaction.member.voice.channel !== interaction.guild.members.me.voice.channel) return interaction.editReply("You need to be in a same/voice channel.")

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new EmbedBuilder()
                .setAuthor({ name: `Queue - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor(client.color)
				.setDescription(`**Currently Playing:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str }`)
				.setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${queue.formattedDuration} • Total duration`});
			pages.push(embed);
		}

		if (!args) {
			if (pages.length == pagesNum && queue.songs.length > 10) QueuePage(client, interaction, pages, 60000, queue.songs.length, queue.formattedDuration);
			else return interaction.editReply({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args)) return interaction.editReply('Page must be a number.');
			if (args > pagesNum) return interaction.editReply(`There are only ${pagesNum} pages available.`);
			const pageNum = args == 0 ? 1 : args - 1;
			return interaction.editReply({ embeds: [pages[pageNum]] });
		}
	}
}
