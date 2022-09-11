const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require("@distube/yt-dlp");

/// Call Config
const { TOKEN, PREFIX, OWNER_ID } = require("./config.json");

process.on('unhandledRejection', error => console.log(error));
process.on('uncaughtException', error => console.log(error));

/// Multi bot login support
for (let i = 0; i < TOKEN.length ; i++) {
    const client = new Client({
        shards: "auto",
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.MessageContent,
        ],
        allowedMentions: {
            parse: ["roles", "users", "everyone"],
            repliedUser: false
        },
    });

    client.config = require('./config.json');
    // Print prefix
    client.prefix = PREFIX[i];
    client.owner = OWNER_ID;

    // Print bot token
    if (!client.token) client.token = TOKEN[i];

    client.distube = new DisTube(client, {
        searchSongs: 0, /// SET TO 5 FOR ENABLE SEARCH MODE!
        searchCooldown: 30,
        leaveOnEmpty: true,
        emptyCooldown: 60,
        leaveOnFinish: true,
        leaveOnStop: true,
        plugins: [
            new SoundCloudPlugin(),
            new SpotifyPlugin({
                emitEventsAfterFetching: true
            }),
            new YtDlpPlugin()],
    });

    ["aliases", "commands"].forEach(x => client[x] = new Collection());
    ["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./handlers/${x}`)(client));

    client.login(client.token);
}