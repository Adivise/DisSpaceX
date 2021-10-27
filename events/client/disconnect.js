const chalk = require("chalk")

module.exports = client => {
    console.log(chalk.redBright(` [${message.guild.me.displayName}] || Disconnected at ${new Date()}.`))
}
