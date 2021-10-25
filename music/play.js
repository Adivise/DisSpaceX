module.exports = { 
    config: {
        name: "play",
        description: "Play a song/playlist or search for a song from youtube",
        usage: "<results>",
        category: "music",
        accessableby: "Member",
        aliases: ["p", "pplay"]
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const string = args.join(" ")
        if (!string) msg.edit(`Please enter a song url or query to search.`)
        try {
            client.distube.play(message, string)
        } catch (e) {
            message.channel.send(`Error: \`${e}\``)
        }
    }
};