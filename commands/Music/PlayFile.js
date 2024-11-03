const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = {
    name: ["playfile"],
    description: "Play file with mp3/wav/ogg",
    category: "Music",
    options: [
        {
            name: "file",
            type: ApplicationCommandOptionType.Attachment,
            description: "file with mp3/wav/ogg.",
            required: true,
        }
    ],
    run: async (client, interaction) => {
        try {
            if (interaction.options.getAttachment("file")) {
                const db = await GSetup.get(interaction.guild.id);
                if (db.setup_enable === true) return interaction.reply("Command is disable already have song request channel!");

                await interaction.reply(`🔍 **Loading...** \`${interaction.options.getAttachment("file").name}\``);

                const message = await interaction.fetchReply();
                await client.createPlay(interaction, message.id);

                const { channel } = interaction.member.voice;
                if (!channel) return interaction.editReply("You need to be in voice channel.")
                if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
                if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

                try {
                    const string = interaction.options.getAttachment("file").url;

                    const options = {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction,
                    }

                    await client.distube.play(interaction.member.voice.channel, string, options);
                } catch (e) {
                    //
                }
            }
        } catch (e) {
            //
        }
    }
}
