const Discord = require('discord.js')

const db = require("quick.db")

exports.run = async(client, message, args) => {
    
if(message.author.id !== "251143265271808001")
return message.channel.send("Sorry, only my master can use that!") 
    
message.delete()
    
let member = message.mentions.members.first()
if(!member) return message.channel.send("umm..maybe specify a user?")

let bugreport = db.get(`bugreport_${member.id}`)
if(bugreport !== true) return message.channel.send("this user does not have a bug report submitted!")

db.add(`reports_${member.id}`, 1) 
db.delete(`bugreport_${member.id}`)
    
let reports = db.get(`reports_${member.id}`)
let type = "Happy bug hunting!"
if(reports == 1) type = "For your effort and time, we have given you a bug hunter role and a badge on your ReCreate profile as a reward and honour!"
if(reports == 5) type = "For all your hard work and contributions, we have given you the **Bug Squasher** role and leveled up your bug hunter badge to show people your passion towards ReCreate!"
    
let bug_hunter_role = message.guild.roles.cache.find(r => r.name == 'Bug Hunter');
let bug_squasher_role = message.guild.roles.cache.find(r => r.name == 'Bug Squasher');
    
if(reports == 1) {
member.roles.add(bug_hunter_role)
} else if(reports == 5) {
member.roles.remove(bug_hunter_role)
member.roles.add(bug_squasher_role)
} else {
return;
}

let congrats = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🎉 Bug Report Approved")
.setDescription(`Congrats, ${member.username}, your bug report has been checked over and marked as approved! Thank you for submitting this bug report, you have helped improve users' experience with ReCreate and overall made ReCreate a better discord bot! ${type}`)
.setFooter(`Bug Reports Approved: ${reports}`)
member.send(congrats).catch(console.error)
       
let accepted = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🎉 Bug Report Approved")
.setDescription(`Congrats, **${member.user.username}**, your bug report has been checked over and marked as approved! Thank you for submitting this bug report, you have helped improve users' experience with ReCreate and overall made ReCreate a better discord bot!`)
message.guild.channels.cache.get("735946401166524516").send(accepted)
    
}