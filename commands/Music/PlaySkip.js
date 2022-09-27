const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = {
    name: ["music", "playskip"],
    description: "Play and skip to a song!",
    category: "Music",
    options: [
        {
            name: "search",
            type: ApplicationCommandOptionType.String,
            description: "The song to play.",
            required: true,
            autocomplete: true
        }
    ],
    run: async (client, interaction) => {
        try {
            if (interaction.options.getString("search")) {
                const db = await GSetup.get(interaction.guild.id);
                if (db.setup_enable === true) return interaction.reply("Command is disable already have song request channel!");

                await interaction.reply(`🔍 **Searching...** \`${interaction.options.getString("search")}\``);

                const message = await interaction.fetchReply();
                await client.createPlay(interaction, message.id);

                const { channel } = interaction.member.voice;
                if (!channel) return interaction.editReply("You need to be in voice channel.")
                if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
                if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

                try {
                    const string = interaction.options.getString("search");

                    const options = {
                        member: interaction.member,
                        textChannel: interaction.channel,
                        interaction,
                        skip: true
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
