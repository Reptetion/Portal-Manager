const chalk = require('chalk');

exports.run = async(bot) => {

bot.database.on("ready", () => {
console.log(chalk.bgGreen('[MongoDB]:') + chalk.green(' Connected to main database.'))
})

bot.subdb.on("ready", () => {
console.log(chalk.bgGreen('[MongoDB]:') + chalk.green(' Connected to sub database.'))
})

console.log(chalk.bgGreen('[Bot]:') + chalk.green(` Connected to Discord and logged in as ${bot.user.tag}.`))
    
}