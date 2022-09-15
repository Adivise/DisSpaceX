const { readdirSync } = require("fs");
const { white, green } = require("chalk");

module.exports = async (client, message) => {
    const load = dirs => {    
        const events = readdirSync(`./events/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dirs}/${file}`);
            let eName = file.split('.')[0];
            client.on(eName, evt.bind(null, client));
          };
        };
      ["client", "guild"].forEach(x => load(x));
      console.log(white('[') + green('INFO') + white('] ') + green('Client ') + white('Events') + green(' Loaded!'));
};