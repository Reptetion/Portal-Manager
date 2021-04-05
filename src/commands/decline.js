const { MessageEmbed } = require('discord.js');

exports.run = async(bot, message, args) => {
    
if(message.author.id !== bot.config.dev) return message.channel.send('Sorry, only my master can use that!') 
    
message.delete()
    
let member = message.mentions.members.first()
if(!member) return message.channel.send('Umm..maybe specify a user?')

let bugreport = await bot.database.get(`${member.id}.report`)
if(bugreport !== true) return message.channel.send('This user does not have a bug report submitted!')
    
if(!args.slice(1).join(' ')) return message.channel.send('Please provide a reason for why your declining this report!')
    
let reports = await bot.database.get(`${member.id}.reports`) || '0'
    
await bot.database.delete(`${member.id}.bugreport`)
    
let sorry = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('🛑 Bug Report Declined')
.setDescription(`Hello, **${member.user.username}**! I am sorry to say but your bug report has been declined and marked as not a bug. Please read the description below to find out why it was denied.\n\n**Reason:** ${args.slice(1).join(' ')}`)
.setFooter(`Bug Reports Approved: ${reports}`)
member.send(sorry).catch(console.error)
       
let declined = new Discord.MessageEmbed()
.setColor(bot.config.color)
.setTitle('🛑 Bug Report Declined')
.setDescription(`**Submitter:** ${member}\n\n**Bug Report Status:** Declined\n\n**Reason:** ${args.slice(1).join(' ')}`)
message.guild.channels.cache.get('735946401166524516').send(declined)

}

exports.config = {
name: 'decline',
description: 'Declines a bug report.',
usage: 'p!decline <@mention> <reason>'
}