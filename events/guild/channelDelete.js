const { Database } = require("st.db");

const GSetup = new Database("./settings/models/setup.json", { databaseInObject: true });

module.exports = async (client, channel) => {
    if (channel.type == 2) {
        if (channel.members.has(client.user.id)) {
            const queue = client.distube.getQueue(channel.guild.id);
            if (!queue) return;
            client.distube.stop(channel);
            client.distube.voices.leave(channel.guild);
        }
    }

    if (channel.type == 0) {
        const db = await GSetup.get(channel.guild.id);
        if (db.setup_ch == channel.id) {
            await client.createAlreadySetup(channel); // Can find on handlers/loadDatabase.js
        }
    }
};