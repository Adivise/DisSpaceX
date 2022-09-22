const { readdirSync } = require("fs");

module.exports = async (client) => {
    try {
        readdirSync("./events/distube/").forEach(file => {
            const event = require(`../../events/distube/${file}`);
            let eventName = file.split(".")[0];
            client.distube.on(eventName, event.bind(null, client));
          });
    } catch (e) {
        console.log(e);
    }
};