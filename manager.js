const { Client, Collection, MessageEmbed } = require("discord.js");

const { Database } = require("quickmongo");

const server = require('./server.js');

const DBL = require("dblapi.js");

const axios = require('axios');

const chalk = require("chalk");

const fs = require("fs");

const bot = new Client({
cacheGuilds: true,
cacheChannels: false,
cacheOverwrites: false,
cacheRoles: false,
cacheEmojis: false,
cachePresences: false,
fetchAllMembers: false,
messageCacheMaxSize: 25,
messageCacheLifetime: 10000, 
messageSweepInterval: 12000,
ws: {
intents: [
"GUILDS",
"GUILD_MEMBERS",
"GUILD_MESSAGES"
],
},
})

bot.commands = new Collection()
bot.aliases = new Collection()

bot.config = require('./config.json')

bot.database = new Database(bot.config.dbURL)
bot.subdb = new Database(bot.config.subdbURL, 'Users')

bot.dbl = new DBL(bot.config.dbltoken, { webhookPort: 4083, webhookAuth: '8550' })

fs.readdir("./src/commands/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/commands/${file}`)
try {
if(command.config) {
bot.commands.set(command.config.name, command)
command.config.aliases.forEach(alias => bot.aliases.set(alias, command.config.name))
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${command.config.name} has been loaded.`))
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${bot.commands.size} commands commands are ready.`))
}
} catch (e) {
console.log(chalk.bgRed('[Bot]:') + chalk.red(` ${command.config.name} could not load properly. Error: ${e}`))
}
})
})

fs.readdir("./src/events/", (err, files) => {
files.forEach(file => {
let eventFunc = require(`./src/events/${file}`)
let event = file.split(".")[0]
try {
bot.on(event, (...args) => eventFunc.run(bot, ...args));
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${event} has been loaded.`))
} catch (e) {
console.log(chalk.bgRed('[Bot]:') + chalk.red(` ${event} could not load properly. Error: ${e}`))
}
})
})

bot.dbl.webhook.on('ready', hook => {
console.log(chalk.bgGreen('[DBL]:') + chalk.green(' Webhook running!'))
})

bot.dbl.webhook.on('vote', vote => {
let tyforvoting = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('Someone has voted on top.gg!')
.setURL('https://top.gg/bot/634561188822384656/vote')
.setDescription(`<:wumpus_luv:724672126002528298> Thank you for voting, <@${vote.user}>! You have received some rewards, Enjoy!\n\n• Access to \`re!vote claim\`\n• **Supporter** badge on your profile\n• 25% XP Boost\n\nRemember to vote every 12 hours so you can keep all those goodies!`)
.setFooter("Thank You For Supporting ReCreate!")
bot.channels.cache.get("767103210539188286").send(tyforvoting)
let guild = bot.guilds.cache.get('658824686997733399')
let role = guild.roles.cache.find(r => r.id == '784606299069218827')
let member = guild.members.cache.find(v => v.id == vote.user)
if(member) {
member.roles.add(role).catch(console.error)
}
})

async function activatePremium() {

const { data: responses } = await axios.get("https://dev.sellix.io/v1/orders", {
headers: {
Authorization: `Bearer ${bot.config.sellixkey}`
}
})

const { custom_fields } = responses.data.orders[0]

if(responses.data.status !== 'COMPLETED') return;

let premium = await bot.subdb.get(`${custom_fields['Discord ID']}.premiumuser`)
if(!premium) {
await bot.subdb.set(`${custom_fields['Discord ID']}.premiumuser`, true)
} else {
return;
}

let guild = bot.guilds.cache.get('658824686997733399')
let role = guild.roles.cache.find(r => r.id == '802370096538189824')
let member = guild.members.cache.find(m => m.id == `${custom_fields['Discord ID']}`)
if(member) {
member.roles.add(role).catch(console.error)
}

let reptetion;
try {
reptetion = bot.users.cache.get(bot.config.dev) || await bot.users.fetch(bot.config.dev, true)
} catch (e) {
}

let premiumPurchase = new MessageEmbed()
.setColor('#76F076')
.setTitle('Premium Purchase!')
.setURL('https://dashboard.sellix.io/invoices')
.setDescription(`\`${custom_fields['Discord ID']}\` has purchased **ReCreate Premium**!\n\n\`\`\`Purchase Info\n\nPurchase ID: ${response.data.id}\nCoupon: ${responses.data.coupon_id || 'None'} - ${responses.data.discount || '0'}% off\nStatus: ${responses.data.status}\`\`\``)
.setTimestamp()
reptetion.send(premiumPurchase)

console.log(chalk.bgGreen('[User]:') + chalk.green(` Premium has been activated for ${custom_fields['Discord ID']}.`))

}

activatePremium()

process.on('warning', console.warn)
process.on('unhandledRejection', error => {
console.log(chalk.bgRed('[Error]:') + chalk.red(` ${error}`))
}) 

bot.login(bot.config.token)