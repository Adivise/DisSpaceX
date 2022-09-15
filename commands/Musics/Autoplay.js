const { EmbedBuilder } = require("discord.js");

module.exports = {
    config: {
        name: "autoplay",
        aliases: ["ap"],
        description: "Toggles autoplay for the current guild.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const msg = await message.channel.send("Processing.....");
        
        const queue = client.distube.getQueue(message);
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        const { channel } = message.member.voice;
        if (!channel || message.member.voice.channel !== message.guild.members.me.voice.channel) return msg.edit("You need to be in a same/voice channel.")

        if (!queue.autoplay) {
            client.distube.toggleAutoplay(message);
    
            const embed = new EmbedBuilder()
                .setColor("#000001")
                .setDescription(`\`⏯\` Activate **Autoplay** mode.`);

            msg.edit({ content: ' ', embeds: [embed] });
        } else {
            client.distube.toggleAutoplay(message);

            const embed = new EmbedBuilder()
                .setColor("#000001")
                .setDescription(`\`⏯\` Disable **Autoplay** mode.`);

            msg.edit({ content: ' ', embeds: [embed] });
        }
    }
}
