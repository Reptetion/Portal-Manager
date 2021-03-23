const chalk = require('chalk');

exports.run = async(bot, message, args) => {

if(message.author.id == bot.config.dev) return;

if(!args.join(' ')) return message.channel.send(`${bot.config.refail} Please provide some code to evaluate!`)

let code = (lang, code) => (`\`\`\`${lang}\n${String(code).slice(0, 1000) + (code.length >= 1000 ? '...' : '')}\n\`\`\``).replace(bot.config.token, '*'.repeat(bot.config.token.length))

let result = new MessageEmbed()
.setTimestamp()

try {  
let eval = eval(args.join(' '))
let res = (typeof evald === 'string' ? evald : inspect(evald, { depth: 0 }))
result.setColor(bot.config.success)
result.addField('Result', code('js', res))
result.addField('Type', code('css', typeof evald === 'undefined' ? 'Unknown' : typeof evald))
} catch (e) {
result.setColor(bot.config.error)
result.addField('Error', code('js', err))
console.log(chalk.bgRed('[Error]: ') + chalk.red(e))
} finally {
msg.channel.send(result).catch(err => message.channel.send(`\`\`\`An error occured!\n\n${err.message}\`\`\``))
}

}

exports.config = {
name: 'eval',
module: 'Developer',
description: 'Evaluates some code.',
usage: 'eval <code>'
}