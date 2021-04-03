const Discord = require('discord.js')

const db = require("quick.db")

exports.run = async(client, message, args) => {
    
if (message.author.id !== "251143265271808001")
return message.channel.send("Sorry, only my master can use that!") 
    
message.delete()
    
let member = message.mentions.members.first()
if(!member) return message.channel.send("umm..maybe specify a user?")

let bugreport = db.get(`bugreport_${member.id}`)
if(bugreport !== true) return message.channel.send("this user does not have a bug report submitted!")
    
let reason = args.slice(1).join(' ')
if(!reason) return message.channel.send("please specifcy a reason to decline this report!")
    
let reports = db.get(`reports_${member.id}`)
if(reports === null) reports = "0"
    
db.delete(`bugreport_${member.id}`)
    
let sorry = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🛑 Bug Report Declined")
.setDescription(`Hello, **${member.user.username}**! I am sorry to say but your bug report has been declined and marked as not a bug. Please read the description below to find out why it was denied.\n\n**Reason:** ${reason}`)
.setFooter(`Bug Reports Approved: ${reports}`)
member.send(sorry).catch(console.error)
       
let declined = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("🛑 Bug Report Declined")
.setDescription(`**Submitter:** ${member.user}\n\n**Bug Report Status:** Declined\n\n**Reason:** ${reason}`)
message.guild.channels.cache.get("735946401166524516").send(declined)

}