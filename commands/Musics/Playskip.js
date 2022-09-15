const { PermissionsBitField } = require("discord.js");

module.exports = {
    config: {
        name: "playskip",
        description: "Plays a song from the source.",
        accessableby: "Member",
        category: "music",
    },
    run: async (client, message, args) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in voice channel.")
        if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Connect)) return message.channel.send(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(message.guild.members.me).has(PermissionsBitField.Flags.Speak)) return message.channel.send(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        const string = args.join(" ");
        if (!string) return message.channel.send("Please provide a song name or link.");

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
            skip: true
        }

        await client.distube.play(message.member.voice.channel, string, options);
    }
}
