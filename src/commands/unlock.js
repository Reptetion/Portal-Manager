const { MessageEmbed } = require("discord.js");

exports.run = async(bot, message, args) => {
    
if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('You n')
    
let role = message.guild.roles.cache.find(r => r.id == '658824686997733399')

message.delete()
    
let channel = message.mentions.channels.first() || message.channel
    
let perms = channel.permissionsFor(role)
if(perms.has('SEND_MESSAGES')) return message.channel.send('Hm? This channel is not locked..')
    
channel.updateOverwrite(role, { SEND_MESSAGES: null })
    
let unlocked = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('🔓 Channel Unlocked')
.setDescription('WOOHOO! Looks like this lockdown is over and this channel is ready to get moving!')
channel.send(unlocked)
    
}

exports.config = {
name: 'unlock',
description: 'Unlocks a channel.',
usage: 'p!unlock [#channel]',
aliases: []
}