const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pong!"),

  run: async (interaction) => {
        interaction.reply({
            content: "Pong!",
            ephemeral: true
    })
}}