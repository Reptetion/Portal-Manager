const chalk = require('chalk');

exports.run = async(bot, member) => {

let premium_user = await bot.subdb.get(`${member.id}.premiumuser`)
if(!premium_user) return;

let role = member.guild.roles.cache.find(r => r.id == '802370096538189824')
member.roles.add(role)

console.log(chalk.bgGreen('[User]:') + chalk.green(` Added the Donator role to ${member.user.tag} [${member.id}].`))

}