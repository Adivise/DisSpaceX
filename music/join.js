const { MessageEmbed } = require('discord.js');

module.exports = { 
    config: {
        name: "join",
        description: "Makes the bot join the voice channel.",
        category: "music",
        accessableby: "Member",
        aliases: ["cmon"]
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        client.distube.voices.join(channel);

        const embed = new MessageEmbed()
            .setDescription(`\`🔊\` | **Joined:** \`${channel.name}\``)
            .setColor('#000001');

        nsg.edit('', embed)
    }
};