const { Intents, Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const DisTube = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { TOKEN, EMPTY_LEAVE, LEAVE_FINISH } = require('./config.json');

const client = new Client({
    shards: "auto",
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
});

const distube = new DisTube.DisTube(client, {
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

client.commands = new Collection();
client.cooldowns = new Collection();
client.aliases = new Collection();
client.slashCommands = new Collection();
client.categories = readdirSync(`./commands`);
client.distube = distube;

["events", "commands", "distube", "slashCommands"]
    .filter(Boolean)
    .forEach(h => {
        require(`./handlers/${h}`)(client);
})

client.login(TOKEN)
