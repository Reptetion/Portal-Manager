const { MessageEmbed} = require('discord.js');

exports.run = async(bot, message, args) => {

if(!arg[0]) {

let help = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('Portal Manager Help')
.setThumbnail(bot.user.avatarURL())
.setDescription(bot.fun.map(c => `\`${c.config.name}\``).join(', '))
message.channel.send(help)

} else if(bot.commands.get(args[0])) {

let command = bot.commands.get(args[0])

let help = new MessageEmbed()
.setColor(bot.config.color)
.setTitle(`${command.config.name}`)
.setDescription(command.config.description)
.addField('Usage', command.config.usage)
.setFooter('<> = Required, [] = Optional')
if(command.config.aliases.length !== 0) help.addField('Aliases', command.config.aliases.join(', '))  
message.channel.send(help)

} else if(bot.commands.get(bot.aliases.get(args[0]))) {

let command = bot.commands.get(bot.aliases.get(args[0]))

let help = new MessageEmbed()
.setColor(bot.config.color)
.setTitle(`${command.config.name}`)
.setDescription(command.config.description)
.addField('Usage', command.config.usage)
.setFooter('<> = Required, [] = Optional')
if(command.config.aliases.length !== 0) help.addField('Aliases', command.config.aliases.join(', '))  
message.channel.send(help)

} else {

return;
        
}

}

exports.config = {
name: 'help',
description: 'Sends a list of commands.',
usage: 'p!help [command]',
aliases: [ 'commands' ]
}