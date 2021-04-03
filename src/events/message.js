const recentCommandUsage = new Set();

const Discord = require("discord.js")

exports.run = async(client, message) => {
  if (message.author.bot) return;
  
  //Help Responses
if(message.content.startsWith('i need help')) {
let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("To get help with ReCreate, please visit the <#735945573366235158> channel and state your question!")
message.channel.send(help)   
}
  if(message.content.startsWith('how do i report')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("**How Do I Report A Bug In ReCreate?**\nTo report a bug, please run `w!bugreport` in one of the bot channels and give out all the information you can about the bug so we can be sure to track it and maybe give you a badge!\n**How Do I Report A User?**\nTo report a user **in** this server run ``re!report <user> [reason]`` in one of the bot channels but if you want to report a user **out** of this server that is abusing/spamming ReCreate, please DM **Reptetion#0580** or ping him!")
  message.channel.send(help) 
}
    
    if(message.content.startsWith('why is recreate down') || message.content.startsWith('why is recreate offline') || message.content.startsWith('why is recreate off')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
 .setDescription("Hmmm..looks like <#740018702384103546> might help!")
  message.channel.send(help)
}
    
  if(message.content.startsWith('why is recreate on dnd')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("If ReCreate is on 'dnd', it means ReCreate is a bit unstable but can possibly still operate. To find out more, check out <#740018702384103546>!")
  message.channel.send(help)
}
    
  if(message.content.startsWith('when is recreate going to get a update')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("If you want to get notified/pinged when ReCreate gets a update, then take a look at <#717190809442582550>! We usually post updates and important notices in <#658855714865020939> and <#658855881915760670>.")
  message.channel.send(help)
}
    
  if(message.content.startsWith('how do i become a partner')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setTitle('Bot Partnerships')
  .setDescription(
"1. Your bot must be in 200+ servers. Your bot must also have a support server.\n\n" +

"2. Your bot must be neat and organized with at least 20+ commands. Plain/useless commands won't count.\n\n" +

"3. You must have a description for your bot advertisement. We do not Ping4Ping.\n\n" +

"4. Your bot must have stable uptime. We understand if your bot goes down due to host problems and updates.\n\n" +

"5. Your bot must be actively used by users. It also must be verified by Discord so we can insure that it is legit.\n\n" +

"6. Your bot must be 100% original. We do not accept bots that are cloned from a github repo or aren't coded by you.\n\n" +

"7. You must have a partner channel in your bot's support server. You must also stay in this server for the partnership to stay.\n\n" +

"All Partnered Bots will be invited* and partners will receive a partner badge on their profile as well as a role in this server. If you think you got what it takes, DM **Reptetion#0580** and then your bot will be tested to see if its worthy enough!\n\n* - Only partners that invite ReCreate to their server will get their bot invited."
)
message.channel.send(help)   
}
    
if(message.content.startsWith('what do i get for boosting') || message.content.startsWith('what perks do i get for boosting')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("• Hoisted role in the server and a cool icon beside your name.\n\n• Engaged Creator and the Supporter badge on your ReCreate profile.")
  message.channel.send(help) 
}
    
   if(message.content.startsWith('how do i get a badge') || message.content.startsWith('how to get badge')) {
  let help = new Discord.MessageEmbed()
  .setColor("#7777f4")
  .setDescription("You want a badge huh? Well run `re!badges` in one of the bot channels and that will basically tell you how you can get some sweet badges on your ReCreate profile!")
  message.channel.send(help)  
}
    
//Fun Responses
if(message.content.startsWith('i love recreate') || message.content.startsWith('i love ReCreate')) {
message.react("788113224251605022")
  }
   
if(message.content.startsWith('wumpus') || message.content.startsWith('Wumpus')) {
message.channel.send("?")
}
    
if(message.content.startsWith('<@251143265271808001>') || message.content.startsWith('<@!251143265271808001>')) {
message.channel.send("should u really be doing that?")
}
    
if(message.content.startsWith('HELP')) {
message.channel.send("<:wumpus_police:772249483140137010>")
  }
    
if(message.content.startsWith('stop')) {
message.channel.send("ok")
  }

  if(message.content.startsWith("w!"))
    
  if(recentCommandUsage.has(message.author.id)){
  message.reply("you need to chill...").then(msg => msg.delete({ timeout: 2500 }))
    
  }else{
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice("w!".length));
  if(!commandfile) return;
  commandfile.run(client,message,args).catch(err => message.channel.send(err))
    recentCommandUsage.add(message.author.id);
  setTimeout(() => {
  recentCommandUsage.delete(message.author.id)
  }, 1000);
  } 
}