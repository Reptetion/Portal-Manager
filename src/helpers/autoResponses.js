const { MessageEmbed } = require("discord.js");

exports.run = async(bot, message) => {

if(message.content.startsWith('i need help')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription('To get help with ReCreate, please visit the <#735945573366235158> channel and state your question!')
message.channel.send(help)   
}

if(message.content.startsWith('how do i report')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription('**How Do I Report A Bug In ReCreate?**\nTo report a bug, please run `p!bugreport` in one of the bot channels and give out all the information you can about the bug so we can be sure to track it and maybe give you a badge!\n\nFor any other reports, please DM <@251143265271808001> or ping him!')
message.channel.send(help) 
}
        
if(message.content.startsWith('why is ReCreate down') || message.content.startsWith('why is ReCreate offline') || message.content.startsWith('why is recreate off')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription('Hmmm..looks like <#740018702384103546> might help!')
message.channel.send(help)
}
        
if(message.content.startsWith('why is ReCreate on dnd')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription("If ReCreate is on <:dnd:661399207365574657>, it means ReCreate is a bit unstable but can possibly still operate. To find out more, check out <#740018702384103546>!")
message.channel.send(help)
}
        
if(message.content.startsWith('when is recreate going to get a update') || message.content.startsWith('when is ReCreate going to get a update')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription('If you want to get notified/pinged when ReCreate gets a update, then take a look at <#717190809442582550>! We usually post updates and important notices in <#658855714865020939> and <#658855881915760670>.')
message.channel.send(help)
}
        
if(message.content.startsWith('what do i get for boosting') || message.content.startsWith('what perks do i get for boosting')) {
let help = new MessageEmbed()
.setColor(bot.config.color)
.setDescription('• Hoisted role in the server and a cool icon beside your name.\n\n• Engaged Creator and the Supporter badge on your ReCreate profile.')
message.channel.send(help) 
}
        
if(message.content.startsWith('i love recreate') || message.content.startsWith('i love ReCreate')) {
message.react('788113224251605022')
}
       
if(message.content.startsWith('portal manager') || message.content.startsWith('Portal Manager')) {
message.channel.send('?')
}
        
if(message.content.startsWith('HELP')) {
message.channel.send('<:portal_manager:803345939094831165>')
}
        
if(message.content.startsWith('stop')) {
message.channel.send('ok')
}

}