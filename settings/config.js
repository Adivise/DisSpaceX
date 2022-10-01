require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001", // embed message color!

    // Default autocomplete search
    SEARCH_DEFAULT: ["lo fi", "jvke", "post malone", "bassboost"],
    // Leave voice empty
    LEAVE_EMPTY: parseInt(process.env.LEAVE_EMPTY || "120000"), // 1000 = 1 sec

    // Spotify support playlist more 100+ track || false = default || Can get from here: https://developer.spotify.com/dashboard/applications
    SPOTIFY_TRACKS: parseBoolean(process.env.SPOTIFY_TRACKS || false),
    SPOTIFY_ID: process.env.SPOTIFY_ID || "SPOTIFY_CLIENT_ID",
    SPOTIFY_SECRET: process.env.SPOTIFY_SECRET ||"SPOTIFY_CLIENT_SECRET"
}

function parseBoolean(ask) {
    if (typeof (ask) === 'string') {
        ask = ask.trim().toLowerCase();
    }
    switch (ask) {
        case true:
        case "true":
            return true;
        default:
            return false;
    }
}