const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

const QueuePage = async (client, message, pages, timeout, queueLength, queueDuration) => {
    if (!message && !message.channel) throw new Error('Channel is inaccessible.');
    if (!pages) throw new Error('Pages are not given.');

    const row1 = new ButtonBuilder()
        .setCustomId('back')
        .setLabel('⬅')
        .setStyle(ButtonStyle.Secondary)
    const row2 = new ButtonBuilder()
        .setCustomId('next')
        .setLabel('➡')
        .setStyle(ButtonStyle.Secondary)
    const row = new ActionRowBuilder()
        .addComponents(row1, row2)

    let page = 0;
    const curPage = await message.editReply({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row], allowedMentions: { repliedUser: false } });
    if(pages.length == 0) return;

    const filter = (m) => m.user.id === message.user.id;
    const collector = await curPage.createMessageComponentCollector({ filter, time: timeout });

    collector.on('collect', async (interaction) => {
            if(!interaction.deferred) await interaction.deferUpdate();
            if (interaction.customId === 'back') {
                page = page > 0 ? --page : pages.length - 1;
            } else if (interaction.customId === 'next') {
                page = page + 1 < pages.length ? ++page : 0;
            }
            curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [row] })
        });

    collector.on('end', () => {
        const disabled = new ActionRowBuilder()
            .addComponents(row1.setDisabled(true), row2.setDisabled(true))
        curPage.edit({ embeds: [pages[page].setFooter({ text: `Page • ${page + 1}/${pages.length} | ${queueLength} • Songs | ${queueDuration} • Total duration`})], components: [disabled] })
    });

    return curPage;
};


module.exports = { QueuePage };