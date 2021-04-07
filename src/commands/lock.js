const { MessageEmbed } = require("discord.js");

exports.run = async(bot, message, args) => {
    
if(!message.member.hasPermission('MANAGE_GUILD')) return;

message.delete()
    
let role = message.guild.roles.cache.find(r => r.id == '658824686997733399')
    
let channel = message.mentions.channels.first() || message.channel
    
let perms = channel.permissionsFor(role)
if(!perms.has('SEND_MESSAGES')) return message.channel.send('Hm? This channel is already locked..')
    
channel.updateOverwrite(role, { SEND_MESSAGES: false })
    
let locked = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('🔒 Channel Locked')
.setDescription('Oh no! This channel has been locked! Please check out the <#658855881915760670> channel or any other announcement channel for more info on this lockdown.')
channel.send(channellocked)
    
}

exports.config = {
name: 'lock',
description: 'Locks a channel.',
usage: 'p!lock [#channel]',
aliases: []
}