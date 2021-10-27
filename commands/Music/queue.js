const { MessageEmbed } = require("discord.js");
const pagequeue = require('../../handlers/pagequeue.js');

module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["q", "list"],
    cooldown: 3,
    description: "Displays the queue.",
    memberpermissions: [],

    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message);
        if (!queue) return message.channel.send(`There is nothing in the queue right now!`)
		const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

        const qduration = queue.formattedDuration;

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
			const embed = new MessageEmbed()
                .setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor('#000001')
				.setDescription(`**Currently Playing**\n [${queue.songs[0].name}](${queue.songs[0].url}) \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str }`)
				.setFooter(`Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${queue.formattedDuration} • Total duration`);
			pages.push(embed);
		}

		if (!args[0]) {
			if (pages.length == pagesNum && queue.songs.length > 10) pagequeue(client, message, pages, ['⏮', '⏭'], 120000, queue.songs.length, qduration);
			else return message.channel.send({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args[0])) return message.channel.send('Page must be a number.');
			if (args[0] > pagesNum) return message.channel.send(`There are only ${pagesNum} pages available.`);
			const pageNum = args[0] == 0 ? 1 : args[0] - 1;
			return message.channel.send({ embeds: [pages[pageNum]] });
		}
	}
}
