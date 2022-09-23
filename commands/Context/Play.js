const { PermissionsBitField, ApplicationCommandType } = require('discord.js');
const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = { 
    name: ["Context | Play"],
    type: ApplicationCommandType.Message,
    category: "Context",
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: false });

        const string = (interaction.channel.messages.cache.get(interaction.targetId).content ?? await interaction.channel.messages.fetch(interaction.targetId));
        if (!string.startsWith('https')) return interaction.editReply(`Message must be link.`);

        const db = await GSetup.get(interaction.guild.id);
        if (db.setup_enable === true) return interaction.editReply("Command is disable already have song request channel!");

        await interaction.editReply(`🔍 **Searching...** \`${string}\``);

        const message = await interaction.fetchReply();
        await client.createPlay(interaction, message.id);

        const { channel } = interaction.member.voice;
        if (!channel) return interaction.editReply("You need to be in voice channel.")
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Connect)) return interaction.editReply(`I don't have perm \`CONNECT\` in ${channel.name} to join voice!`);
        if (!channel.permissionsFor(interaction.guild.members.me).has(PermissionsBitField.Flags.Speak)) return interaction.editReply(`I don't have perm \`SPEAK\` in ${channel.name} to join voice!`);

        try {
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
}