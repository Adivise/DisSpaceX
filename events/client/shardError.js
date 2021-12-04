const chalk = require("chalk");

module.exports = (client, error, id) => {
    console.log(chalk.red(`[${String(new Date).split(" ", 5).join(" ")}] || ==> || Shard #${id} Errored`))
}
