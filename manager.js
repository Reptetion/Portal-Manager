const { Client, Collection, MessageEmbed } = require("discord.js");

const { Database } = require("quickmongo");

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
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${bot.commands.size} are ready.`))
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
bot.events.set(event, eventFunc)
bot.on(event, (...args) => eventFunc.run(bot, ...args));
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${event} has been loaded.`))
console.log(chalk.bgGreen('[Bot]:') + chalk.green(` ${bot.events.size} are ready.`))
} catch (e) {
console.log(chalk.bgRed('[Bot]:') + chalk.red(` ${event} could not load properly. Error: ${e}`))
}
})
})

process.on('warning', console.warn)
process.on('unhandledRejection', error => {
console.log(chalk.bgRed('[Error]:') + chalk.red(` ${error}`))
}) 

bot.dbl.webhook.on('ready', hook => {
console.log(`Webhook running!`);
})

dbl.webhook.on('vote', vote => {
let tyforvoting = new MessageEmbed()
.setColor(bot.config.color)
.setTitle('Someone has voted on top.gg!')
.setURL('https://top.gg/bot/634561188822384656/vote')
.setDescription(`<:wumpus_luv:724672126002528298> Thank you for voting, <@${vote.user}>! You have received some rewards, Enjoy!\n\n• Access to \`re!vote claim\`\n• **Supporter** badge on your profile\n• 25% XP Boost\n\nRemember to vote every 12 hours so you can keep all those goodies!`)
.setFooter("Thank You For Supporting ReCreate!")
bot.channels.cache.get("767103210539188286").send(tyforvoting)
let guild = bot.guilds.cache.get('658824686997733399');
let role = guild.roles.cache.find(r => r.name == 'Voted')
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
if(responses.data.status == 'PENDING') return;
if(!await bot.subdb.exists(`${custom_fields['Discord ID']}.premiumuser`)) await bot.subdb.set(`${custom_fields['Discord ID']}.premiumuser`, true)

let guild = bot.guilds.cache.get('658824686997733399');
let role = guild.roles.cache.find(r => r.name == 'Donator')
let member = guild.members.cache.find(v => v.id == vote.user)
if(member) {
member.roles.add(role).catch(console.error)
}

console.log(chalk.bgGreen('[User]:') + chalk.green(` Premium has been activated for ${ID}.`))

}

await activatePremium()

bot.login(bot.config.token)