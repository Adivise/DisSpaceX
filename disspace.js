const { Intents, Client, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

class MainClient extends Client {
    constructor() {
       super({
            shards: "auto",
            allowedMentions: {
            parse: ["roles", "users", "everyone"],
            repliedUser: false
        },
        intents: [ 
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_MESSAGES
        ],
    });

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

this.config = require('./settings/config.js');
this.prefix = this.config.PREFIX;
this.owner = this.config.OWNER_ID;
if(!this.token) this.token = this.config.TOKEN;

const client = this;

this.distube = new DisTube(client, {
  searchSongs: 0,
  searchCooldown: 30,
  leaveOnEmpty: this.config.LEAVE_EMPTY,
  emptyCooldown: this.config.EMPTY_LEAVE,
  leaveOnFinish: this.config.LEAVE_FINISH,
  leaveOnStop: this.config.LEAVE_STOP,
  plugins: [
  new SoundCloudPlugin(), 
  new SpotifyPlugin({
      emitEventsAfterFetching: true
    })],
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./handlers/${x}`)(client));

    }
        connect() {
            return super.login(this.token);
    };
};
module.exports = MainClient;