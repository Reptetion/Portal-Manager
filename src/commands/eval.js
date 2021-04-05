const { MessageEmbed } = require("discord.js");

const chalk = require("chalk");

exports.run = async (bot, message, args) => {

if(message.author.id !== bot.config.dev) return; 
     
function clean(text) {
if(typeof text == 'string') {
return text
.replace(/`/g, '`' + String.fromCharCode(8203))
.replace(/@/g, '@' + String.fromCharCode(8203))
}
return text;
}

function token(input) {
if(typeof input == 'string') {
return input.replace(config.token)
} else if(typeof input == 'object') {
if(Array.isArray(input)) {
function hasToken(value) {
if(typeof value !== 'string') {
return true;
}

return value !== bot.config.token;
}
return input.filter(hasToken)
}
return input;
}
return input;
}

try {
let code = args.join(' ')
let evaled = eval(code)
let func = token(clean(evaled))
if(typeof func !== 'string') {
func = require('util').inspect(func)
}
    
let output = '```js\n' + func + '\n```'
let input = '```js\n' + message.content.slice(7) + '\n```'
let type = typeof evaled
    
let e = new MessageEmbed()
.setColor(bot.config.color)
.addField('Eval Output', `**Type:** ${type}`)
.addField(':inbox_tray: Input', input)
.addField(':outbox_tray: Output', output)
message.channel.send(e).catch(err => message.channel.send(`${bot.config.refail} Too long to display, sent to the console.`).then(console.log(chalk.bgCyan('[Bot]:') + chalk.cyan(` ${output}`))))
    
} catch(err) {
let errIns = require('util').inspect(err)
let error = '```js\n' + errIns + '\n```';
let input = '```js\n' + message.content.slice(6) + '\n```'
if(errIns.length < 1000) {
let e = new MessageEmbed()
.setColor(bot.config.color)
.addField('Evaluation Error', `**Type:** Error`)
.addField(':inbox_tray: Input', input)
.addField(`Error`, error, true)
message.channel.send(e)
    
} else {
let e = new MessageEmbed()
.setColor(bot.config.color)
.addField('Evaluation Error', `**Type:** Error`)
.addField(':inbox_tray: Input', input)
.addField(`Error`, `\```${err.name}: ${err.message}\````, true)
message.channel.send(e)
}
}

}

exports.config = {
name: 'eval',
description: 'Evaluates some JavaScript.',
usage: 'p!eval <js code>',
aliases: []
}