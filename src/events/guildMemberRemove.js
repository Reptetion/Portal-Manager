const chalk = require('chalk');

exports.run = async(bot, member) => {

await bot.database.delete(`${member.id}`)

}