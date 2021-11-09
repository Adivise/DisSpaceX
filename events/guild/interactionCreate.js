module.exports = async (client, interaction) => {
    if(!interaction.isCommand()) return;
    
    const command = client.commands.get(interaction.commandName);
    if(!command) return;

    try {
        await command.run(interaction);
    } catch(e) {
        if (e) console.log(e);
        await interaction.reply({
            content: "An error occured while executing that command.",
            emphemeral: true
        })
    }
}