const { Client, Collection } = require("discord.js");
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require("@distube/yt-dlp");


class MainClient extends Client {
    constructor() {
        super({
            shards: "auto",
            intents: 32767,
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false
            },
        });

        process.on('unhandledRejection', error => console.log(error));
        process.on('uncaughtException', error => console.log(error));

        this.config = require('./settings/config.js');
        this.prefix = this.config.PREFIX;
        this.owner = this.config.OWNER_ID;
        if (!this.token) this.token = this.config.TOKEN;

        const client = this;

        this.distube = new DisTube(client, {
            searchSongs: 0, /// SET TO 5 FOR ENABLE SEARCH MODE!
            searchCooldown: 30,
            leaveOnEmpty: true,
            emptyCooldown: 60,
            leaveOnFinish: true,
            leaveOnStop: true,
            youtubeDL: false,
            plugins: [
                new SoundCloudPlugin(),
                new SpotifyPlugin({
                    emitEventsAfterFetching: true
                }),
                new YtDlpPlugin()],
        });

        ["aliases", "commands"].forEach(x => client[x] = new Collection());
        ["loadCommands", "loadEvents", "loadDistube"].forEach(x => require(`./handlers/${x}`)(client));

    }
    connect() {
        return super.login(this.token);
    };
};
module.exports = MainClient;