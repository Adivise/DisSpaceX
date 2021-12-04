const chalk = require("chalk");

module.exports = (client, event, id) => {
    console.log(chalk.redBright(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Disconnected`))
}
