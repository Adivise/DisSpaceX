const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "autoplay",
    category: "Music",
    aliases: ["ap"],
    cooldown: 3,
    usage: "make bot auto random play!",
    description: "Playing music form souce.",
    memberpermissions: [],

    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        const queue = client.distube.getQueue(message);
        if (!queue) return msg.edit(`There is nothing in the queue right now!`);
        const memberVoice = message.member.voice.channel;
        if (!memberVoice) return msg.edit("You need to be in a voice channel to use command.");

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
    
            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`\`⏯\` Activate **Autoplay** mode.`)

            msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.toggleAutoplay(message);

            const embed = new MessageEmbed()
                .setColor(message.client.color)
                .setDescription(`\`⏯\` Disable **Autoplay** mode.`)

            msg.edit({ content: ' ', embeds: [embed] });
        }
    }
}
