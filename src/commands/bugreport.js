const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

let bugreport = db.get(`bugreport_${message.author.id}`)
if(bugreport === true) return message.channel.send("I cannot accept any more bug reports from you until the developer reviews your previous report.")
  
const filter = response => {
return response.author.id === message.author.id;
}

let start = new Discord.MessageEmbed()
.setColor('#7777f4')
.setTitle('🐛 Bug Report In Progress')
.setDescription(`Thank you for reaching out to us, **${message.author.username}**! Please type out your bug report and include the following:\n\n• Which command does the bug appear in?\n\n• How does this bug affect your experience with ReCreate?\n\n• How do you reproduce this bug?\n\n• Does this bug come with a **Error Code**? If so, please copy and paste it.\n\nPlease provide as much information as you can so it's easier for the developer to track it down! Once your report is submitted, the developer will take a look ar it and if your report is legit and patched, we will give you a badge and a role for your help!`)
.setFooter('You have 2 minutes to submit your report!')
message.channel.send(start).then(() => {

message.channel.awaitMessages(filter, { max: 1, time: 120000, errors: ['time'] })
.then(collected => {
  
message.reply(`your report has been sent!`)
message.author.send("You have successfully submitted your bug report! All you have to do now is wait until the developer reviews it. Once he does, I will notify you!").catch(console.error)
db.set(`bugreport_${message.author.id}`, true)
    
let report = new Discord.MessageEmbed()
.setColor('#7777f4')
.setTitle('🐛 New Bug Report')
.setThumbnail(client.user.avatarURL())
.setDescription(collected.first())
.setFooter(`${message.author.tag} [${message.author.id}]`)
client.channels.cache.get('735946401166524516').send(report).then(async embedMessage => {
await embedMessage.react("🐛");
})

})
  
.catch(collected => {
message.reply('your report has expired!');
})
  
})

}