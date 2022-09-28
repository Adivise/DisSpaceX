const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = async (client) => {

    client.enSwitch = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("spause")
                .setEmoji("⏯"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("sprevious")
                .setEmoji("⬅"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId("sstop")
                .setEmoji("⏹"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("sskip")
                .setEmoji("➡"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("sloop")
                .setEmoji("🔄"),
        ]);

    client.enSwitch2 = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("sshuffle")
                .setEmoji("🔀"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("svoldown")
                .setEmoji("🔉"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sclear")
                .setEmoji("🗑"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId("svolup")
                .setEmoji("🔊"),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setCustomId("squeue")
                .setEmoji("📋"),
        ]);

    client.diSwitch = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("spause")
                .setEmoji("⏯")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sprevious")
                .setEmoji("⬅")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sstop")
                .setEmoji("⏹")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sskip")
                .setEmoji("➡")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sloop")
                .setEmoji("🔄")
                .setDisabled(true),
        ]);

    client.diSwitch2 = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sshuffle")
                .setEmoji("🔀")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("svoldown")
                .setEmoji("🔉")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("sclear")
                .setEmoji("🗑")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("svolup")
                .setEmoji("🔊")
                .setDisabled(true),
            new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("squeue")
                .setEmoji("📋")
                .setDisabled(true),
        ]);
};