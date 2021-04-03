const Discord = require('discord.js');

exports.run = async(client, message, args) => {

message.delete();
  
let member = message.member;
  
let role = member.guild.roles.cache.find(r => r.name === 'ReCreate User');
  
if(member.roles.cache.has(role.id)) return message.channel.send('You have already been verified!').then(msg => msg.delete({ timeout: 5000 }));
  
member.roles.add(role);

let welcome = new Discord.MessageEmbed()
.setColor('#7777f4')
.setTitle("Welcome To ReCreate's Portal")
.setURL('https://discord.com/channels/658824686997733399/658856856990646335/736246292174602370')
.setThumbnail(client.user.avatarURL())
.setDescription("I have successfully verified you! Please check out <#717190809442582550> for roles and if you need help with ReCreate, please ask in <#735945573366235158>. If you have any suggestions or want to improve our bot, please run `re!suggest <suggestion>` in one of the bot channels!\n\n<:wumpus_luv:724672126002528298> Thank you for being part of ReCreate's community!")
.setTimestamp()
message.author.send(welcome).catch(console.error);

}