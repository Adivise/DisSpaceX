const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = { 
    config: {
        name: "loop",
        description: "loop the song!",
        category: "music",
        accessableby: "Member",
        aliases: ["l", "repeat", "r"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)

        let repeatMode;

        if (!args[0]) repeatMode = 1;
        if (args[0] && args[0] === "lagu") repeatMode = 1;
        if (args[0] && args[0] === "song") repeatMode = 1;
        if (args[0] && args[0] === "queue") repeatMode = 2;
        if (args[0] && args[0] === "all") repeatMode = 2;

        if (queue.repeatMode === 0) {
            if (repeatMode === 0) {
                client.distube.setRepeatMode(message, 1);
    
                let embed = new MessageEmbed()
                    .setColor('#000001')
                    .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
                msg.edit('', embed);

            } else if (repeatMode === 1) {
                client.distube.setRepeatMode(message, 1);
    
                let embed = new MessageEmbed()
                    .setColor('#000001')
                    .setDescription(`\`🔁\` | **Song is loop:** \`Current\``)
                msg.edit('', embed);

            } else if (repeatMode === 2) {
                client.distube.setRepeatMode(message, 2);
    
                let embed = new MessageEmbed()
                    .setColor('#000001')
                    .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
                msg.edit('', embed);
            }
        } else {
            client.distube.setRepeatMode(message, 0);
    
            let embed = new MessageEmbed()
                .setColor('#000001')
                .setDescription(`\`🔁\` | **Stop** \`Looping\` **song.**`)
            msg.edit('', embed);

        }   
    }
    
};