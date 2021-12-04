const { Intents, Client, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { TOKEN, EMPTY_LEAVE, LEAVE_FINISH } = require('./config.json');

const client = new Client({
    shards: "auto",
    allowedMentions: {
      parse: ["roles", "users", "everyone"],
      repliedUser: false
    },
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

client.distube = new DisTube(client, {
  searchSongs: 0,
  searchCooldown: 30,
  leaveOnEmpty: true,
  emptyCooldown: EMPTY_LEAVE,
  leaveOnFinish: LEAVE_FINISH,
  leaveOnStop: true,
  plugins: [new SoundCloudPlugin(), new SpotifyPlugin()],
  ytdlOptions: {
    highWaterMark: 1 << 24,
    quality: 'highestaudio'
  },
});

["aliases", "commands"].forEach(x => client[x] = new Collection());
["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./handlers/${x}`)(client));


client.login(TOKEN)
