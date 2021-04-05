const { MessageEmbed } = require('discord.js');

const lastCmdRan = new Set();

exports.run = async(bot, message) => {
  
if(message.author.bot) return;

await require('../helpers/autoResponses.js').run(bot, message, args)
    
let prefix = 'p!'
if(message.content.indexOf(prefix) !== 0) return;

if(lastCmdRan.has(message.author.id)) {

message.reply('you need to chill..').then(msg => msg.delete({ timeout: 2500 }))

} else {

var messageArray = message.content.split(" ") 
var cmd = messageArray[0]
var args = messageArray.slice(1)
var arg = message.content.slice(prefix.length).split(/ +/)
var commandName = arg.shift().toLowerCase()
var command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName))                                               
if(!command) return;

command.run(bot, message, args).catch(err => message.channel.send(`**__ERROR__**:\n\n\`\`\`${err}\`\`\``))  

lastCmdRan.add(message.author.id)
setTimeout(() => {
lastCmdRan.delete(message.author.id)
}, 1500)
}
}