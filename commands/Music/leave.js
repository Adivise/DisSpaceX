const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "leave",
    category: "Music",
    aliases: ["lev", "stop", "disconnect", "dc", "shutup"],
    cooldown: 3,
    description: "Make Bot Leave Channel.",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = message.client.distube.getQueue(message);
		if (!queue) return msg.edit(`There is nothing in the queue right now!`)
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;

        if (clientVoice === memberVoice) {
            
            if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild);
            } else {
                client.distube.voices.leave(message.guild);
            }

            const embed = new MessageEmbed()
                .setDescription(`\`🚫\` | **Leaved:** | \`${memberVoice.name}\``)
                .setColor('#000001')

            msg.edit({ content: ' ', embeds : [embed] });

        }

    }
}
