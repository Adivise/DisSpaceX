const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');

class MainClient extends Client {
    constructor() {
        super({
            shards: "auto",
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Channel, Partials.Message]
        });

    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));

    this.config = require('./settings/config.js');
    this.owner = this.config.OWNER_ID;
    this.color = this.config.EMBED_COLOR;
    if (!this.token) this.token = this.config.TOKEN;

    const client = this;

    this.distube = new DisTube(client, {
        leaveOnEmpty: false, // Don't set this to "true" for 247 Commands working!
        emptyCooldown: 60,
        leaveOnFinish: false, // Don't set this to "true" for 247 Commands working!
        leaveOnStop: true,
        plugins: [
            new SoundCloudPlugin(),
            checkSpotify(client)
        ],
    });

    ["slash"].forEach(x => client[x] = new Collection());
    ["loadCommands", "loadEvents", "loadPlayer", "loadDatabase"].forEach(x => require(`./handlers/${x}`)(client));

    }
    connect() {
        return super.login(this.token);
    };
};

module.exports = MainClient;

function checkSpotify(client) {
    if (client.config.SPOTIFY_TRACKS) {
        console.log("[INFO] You're (Enabled) Spotify More Tracks Support!");
        return spotifyOn(client);
    } else {
        console.log("[INFO] You're (Not Enabled) Spotify More Tracks Support!");
        return spotifyOff();
    }
}

function spotifyOn(client) {
    return new SpotifyPlugin({
        emitEventsAfterFetching: true,
        api: {
            clientId: client.config.SPOTIFY_ID,
            clientSecret: client.config.SPOTIFY_SECRET
        }
    })
}

function spotifyOff() {
    return new SpotifyPlugin({
        emitEventsAfterFetching: true,
    })
}