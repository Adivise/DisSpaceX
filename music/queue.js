const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "queue",
        description: "see queue of song!",
        category: "music",
        accessableby: "Member",
        aliases: ["q"]
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Getting queue...");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const list = queue.songs.map((song, index) => `**${index + 0}. [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`).slice(0, 11).join("\n");
        const csong = queue.songs[0];

        const embed = new MessageEmbed()
            .setAuthor(`Queue - ${message.guild.name}`, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(csong.thumbnail)
            .setDescription(`**Currently Playing**\n**[${csong.name}](${csong.url})** \`${csong.formattedDuration}\` • ${csong.user} \n\n**Rest of queue** \n${list}`)
            .setColor('#000001')
            .setFooter(`Page • 1 | ${queue.songs.length} • Song | ${queue.formattedDuration} • Total duration`);
            
        msg.edit('', embed)
    }
};  