const { EmbedBuilder } = require("discord.js");
const { Database } = require("st.db");
const delay = require("delay");

const db = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = async (client) => {
try {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.guild || interaction.user.bot) return;
        if (interaction.isButton()) {
            const { customId, member } = interaction;
            let voiceMember = interaction.guild.members.cache.get(member.id);
            let channel = voiceMember.voice.channel;

            const queue = client.distube.getQueue(interaction);
            if (!queue) return;
    
            const data = await db.get(interaction.guild.id);
            if (data.setup_enable === false) return;

            switch (customId) {
                case "sprevious":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.previousSongs.length == 0) {
                            interaction.reply("\`🚨\` | **There are no** `Previous` **songs**");
                        } else {
                            await client.distube.previous(interaction);
                            const embed = new EmbedBuilder()
                                .setDescription("\`⏮\` | **Song has been:** `Previous`")
                                .setColor(client.color);

                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;

                case "sskip":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.songs.length === 1 && queue.autoplay === false) {
                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription("\`🚨\` | **There are no** `Songs` **in queue**")
                
                            interaction.reply({ embeds: [embed] });
                        } else { 
                            await client.distube.skip(interaction);
                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription("\`⏭\` | **Song has been:** `Skipped`")
                
                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;

                case "sstop":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.stop(interaction);
                            await client.distube.voices.leave(interaction.guild);

                            const memberVoice = interaction.member.voice.channel;
                
                            const embed = new EmbedBuilder()
                                .setDescription(`\`🚫\` | **Left:** | \`${memberVoice.name}\``)
                                .setColor('#000001')
                
                            interaction.reply({ embeds : [embed] });
                            client.UpdateMusic(queue);
                        }
                    }
                    break;

                case "spause":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.paused) {
                            await client.distube.resume(interaction);

                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription(`\`⏯\` | **Song has been:** \`Resumed\``);
                
                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        } else {
                            await client.distube.pause(interaction);

                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription(`\`⏯\` | **Song has been:** \`Paused\``);
                
                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "sloop":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else if (queue.repeatMode === 2) {
                            await client.distube.setRepeatMode(interaction, 0);
                
                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription(`\`🔁\` | **Song is unloop:** \`All\``)
                
                            interaction.reply({ embeds: [embed] });
                        } else {
                            await client.distube.setRepeatMode(interaction, 2);
                            
                            const embed = new EmbedBuilder()
                                .setColor("#000001")
                                .setDescription(`\`🔁\` | **Song is loop:** \`All\``)
                
                            interaction.reply({ embeds: [embed] });
                        }
                    }
                    break;

                case "sshuffle":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.shuffle(interaction);

                            const embed = new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`\`🔀\` | **Song has been:** \`Shuffle\``);

                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "svoldown":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.setVolume(interaction, queue.volume - 10);

                            const embed = new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`\`🔊\` | **Decrease volume to:** \`${queue.volume}\`%`)
                      
                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "sclear":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await queue.songs.splice(1, queue.songs.length);
                            
                            const embed = new EmbedBuilder()
                                .setDescription(`\`📛\` | **Queue has been:** \`Cleared\``)
                                .setColor(client.color);
                
                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "svolup":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            await client.distube.setVolume(interaction, queue.volume + 10);

                            const embed = new EmbedBuilder()
                                .setColor(client.color)
                                .setDescription(`\`🔊\` | **Increase volume to:** \`${queue.volume}\`%`)
                      
                            interaction.reply({ embeds: [embed] });
                            client.UpdateQueueMsg(queue);
                        }
                    }
                    break;

                case "squeue":
                    {
                        if (!channel) { 
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (interaction.guild.members.me.voice.channel && !interaction.guild.members.me.voice.channel.equals(channel)) {
                            return interaction.reply(`You need to be in a voice channel.`);
                        } else if (!queue) {
                            return interaction.reply(`There is nothing in the queue right now!`);
                        } else {
                            const pagesNum = Math.ceil(queue.songs.length / 10);
                            if(pagesNum === 0) pagesNum = 1;
                        
                            const songStrings = [];
                            for (let i = 1; i < queue.songs.length; i++) {
                            const song = queue.songs[i];
                            songStrings.push(
                                `**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
                                `);
                            };
                    
                            const pages = [];
                            for (let i = 0; i < pagesNum; i++) {
                            const str = songStrings.slice(i * 10, i * 10 + 10).join('');
                            const embed = new EmbedBuilder()
                                .setAuthor({ name: `Queue - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                                .setThumbnail(queue.songs[0].thumbnail)
                                .setColor(client.color)
                                .setDescription(`**Currently Playing:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Rest of queue**${str == '' ? '  Nothing' : '\n' + str }`)
                                .setFooter({ text: `Page • ${i + 1}/${pagesNum} | ${queue.songs.length} • Songs | ${queue.formattedDuration} • Total duration`});
                            
                                pages.push(embed);
                            };
                
                            interaction.reply({ embeds: [pages[0]] });
                        }
                    }
                break;
            default:
                break;
            }
        }
    });
    } catch (e) {
        console.log(e);
}

client.on("messageCreate", async (message) => {
        if (!message.guild || !message.guild.available) return;

        await client.createExSetup(message);

        const data = await db.get(message.guild.id);
        if (data.setup_enable === false) return;

        const channel = await message.guild.channels.cache.get(data.setup_ch);
        if (!channel) return;

        if (data.setup_ch != message.channel.id) return;

        if (message.author.id === client.user.id) {
            await delay(3000);
                message.delete();
        }

        if (message.author.bot) return;

        const song = message.cleanContent;
        await message.delete();

        const voiceChannel = await message.member.voice.channel;
        if (!voiceChannel) return message.channel.send(`You need to be in a voice channel.`).then((msg) => { 
            setTimeout(() => {
                msg.delete()
            }, 4000);
        });

        const options = {
            member: message.member,
            textChannel: message.channel,
            message,
        }

        await client.distube.play(message.member.voice.channel, song, options);
        await UpdateQueue(client, message);

    });
};

async function UpdateQueue(client, message) {
    const queue = client.distube.getQueue(message);
    if (queue) {
        await client.UpdateQueueMsg(queue);
    }
}