const Discord = require('discord.js');

exports.run = async(client, message, args) => {

let help = new Discord.MessageEmbed()
.setColor("#7777f4")
.setAuthor("Wumpus")
.setThumbnail(client.user.avatarURL())
.addField("Who Am I?",
"Hey there discorder! If you don't know who I am, I am Wumpus, yes I know, the best pet in the world! I originated from Discord but after a while of scrolling through discord servers, I decided to serve to **ReCreate's Portal**!\n\n**Why Did I Decide To Serve ReCreate?**\nWell first of all, ReCreate is the best discord bot by far, and getting to help ReCreate's community is like a dream come true!\n\n**What Do I Do Here?**\nHere in ReCreate's Portal, I help moderate, manage, and keep this server in shape! So if you ever see me around, I'm probably helping out users, sending question marks or just keeping unwanted server links out of the way!"
)
message.channel.send(help)

}