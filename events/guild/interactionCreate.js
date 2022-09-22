const { InteractionType } = require("discord.js");
const ytsr = require("@distube/ytsr");

module.exports = async(client, interaction) => {
    if (interaction.isCommand || interaction.isContextMenuCommand || interaction.isModalSubmit || interaction.isChatInputCommand) {
        if (!interaction.guild || interaction.user.bot) return;

        await client.createExSetup(interaction);

        let subCommandName = "";
        try {
            subCommandName = interaction.options.getSubcommand();
        } catch { };
        let subCommandGroupName = "";
        try {
            subCommandGroupName = interaction.options.getSubcommandGroup();
        } catch { };

        if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const SDefault = ["Anime Song", "JVKE", "POST MALONE", "DUBSTEP", "BASSBOOST"];
            const Random = SDefault[Math.floor(Math.random() * SDefault.length)];
            if(interaction.commandName == "play") {
                let choice = []
                await ytsr(interaction.options.getString("search") || Random, { safeSearch: true, limit: 10 }).then(result => {
                    result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
                });
                return await interaction.respond(choice).catch(() => { });
            } else if (interaction.options.getSubcommand() == "playskip") {
                let choice = []
                await ytsr(interaction.options.getString("search") || Random, { safeSearch: true, limit: 10 }).then(result => {
                    result.items.forEach(x => { choice.push({ name: x.name, value: x.url }) })
                });
                return await interaction.respond(choice).catch(() => { });
            }
        }

        const command = client.slash.find(command => {
            switch (command.name.length) {
            case 1: return command.name[0] == interaction.commandName;
            case 2: return command.name[0] == interaction.commandName && command.name[1] == subCommandName;
            case 3: return command.name[0] == interaction.commandName && command.name[1] == subCommandGroupName && command.name[2] == subCommandName;
            }
        });
    
    if (!command) return;
    if (command) {
        try {
            command.run(client, interaction);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: `${client.i18n.get(language, "interaction", "error")}`, ephmeral: true });
        }}
    }
}