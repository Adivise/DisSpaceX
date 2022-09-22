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