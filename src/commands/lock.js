const Discord = require("discord.js");

exports.run = async(client, message, args) => {
    
if (!message.member.hasPermission('MANAGE_GUILD')) return;

message.delete();
    
let role = message.guild.roles.cache.find(r => r.name === 'ReCreate User');
    
let channel = message.mentions.channels.first() || message.channel
    
let perms = channel.permissionsFor(role);
if(!perms.has("SEND_MESSAGES")) return message.channel.send("hm? this channel is already locked")
    
channel.updateOverwrite(role, { SEND_MESSAGES: false });
    
let channellocked = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🔒 Channel Locked")
.setDescription("Oh no! This channel has been locked! Please check out the <#658855881915760670> channel or any other announcement channel for more info on this lockdown.")
channel.send(channellocked)
    
}