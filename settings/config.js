require("dotenv").config();

module.exports = {
    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id
    EMBED_COLOR: process.env.EMBED_COLOR || "#000001" // embed message color!
}