const Discord = require("discord.js");

exports.run = async(client, message, args) => {
    
if (!message.member.hasPermission('MANAGE_GUILD')) return;
    
let role = message.guild.roles.cache.find(r => r.name === 'ReCreate User');

message.delete();
    
let channel = message.mentions.channels.first() || message.channel
    
let perms = channel.permissionsFor(role);
if(perms.has("SEND_MESSAGES")) return message.channel.send("hm? this channel isn't locked")
    
channel.updateOverwrite(role, { SEND_MESSAGES: true });
    
let locked = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🔓 Channel Unlocked")
.setDescription("WOOHOO! Looks like this lockdown is over and this channel is ready to get moving!")
channel.send(locked)
    
}