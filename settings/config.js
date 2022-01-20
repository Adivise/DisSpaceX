
require("dotenv").config();

module.exports = {

    /**
     * @description require settings for the bot
     */

    TOKEN: process.env.TOKEN || "YOUR_TOKEN",  // your bot token
    PREFIX: process.env.PREFIX || "#", //<= default is #  // bot prefix
    OWNER_ID: process.env.OWNER_ID || "YOUR_CLIENT_ID", //your client id

    /**
     *
     */
    EMPTY_LEAVE: process.env.EMPTY_LEAVE || 60, //<= default is 60  // time in seconds

    /**
     * @description boolean settings for the bot
     */
    LEAVE_EMPTY: true, //<= default is true "true" = use and "false" = not use!  // leave voice channel when empty
    LEAVE_FINISH: true, //<= default is true "true" = use and "false" = not use!  // leave voice channel when finished
    LEAVE_STOP:true, //<= default is true "true" = use and "false" = not use!  // leave voice channel when stopped
}