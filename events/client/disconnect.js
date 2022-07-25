const chalk = require("chalk")

module.exports = client => {
    console.log(chalk.redBright(`[${client.user.username}] || Disconnected at ${new Date()}.`))
}
