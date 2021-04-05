const { MessageEmbed } = require('discord.js');

exports.run = async(bot, message, args) => {

let bugreport = await bot.database.get(`${message.author.id}.bugreport`)
if(bugreport) return message.channel.send('I cannot accept any more bug reports from you until the developer reviews your previous report.')
  
let filter = response => {
return response.author.id == message.author.id;
}

let startReport = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('🐛 Bug Report In Progress')
.setDescription(`Thank you for reaching out to us, **${message.author.username}**! Please type out your bug report and include the following:\n\n• Which command does the bug appear in?\n\n• How does this bug affect your experience with ReCreate?\n\n• How do you reproduce this bug?\n\n• Does this bug come with a **Error Code**? If so, please copy and paste it.\n\nPlease provide as much information as you can so it's easier for the developer to track it down! Once your report is submitted, the developer will take a look ar it and if your report is legit and patched, we will give you a badge and a role for your help!`)
.setFooter('You have 2 minutes to submit your report! Type `cancel` to stop.')
message.channel.send(startReport).then(() => {

message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] }).then(collected => {

if(collected.first().content == 'cancel') {

message.channel.send("Alright, I won't be sending that report then.")

} else {
  
message.reply(`your report has been sent!`)
message.author.send('You have successfully submitted your bug report! All you have to do now is wait until the developer reviews it. Once he does, I will notify you!').catch(console.error)
await bot.database.set(`${message.author.id}.bugreport`, true)
    
let report = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('🐛 New Bug Report')
.setThumbnail(bot.user.avatarURL())
.setDescription(collected.first())
.setFooter(`${message.author.tag} [${message.author.id}]`)
client.channels.cache.get('735946401166524516').send(report).then(async embed => {
await embed.react('🐛')
})

}

}).catch(collected => {
message.reply('your report has expired!')
})
  
})

}

exports.config = {
name: 'bugreport',
description: 'Sends a bug report.',
usage: 'p!bugreport',
aliases: []
}