const { Client, Collection } = require("discord.js");

const { Database } = require("quickmongo");

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
bot.events = new Collection()

bot.config = require('./config.json')

bot.database = new Database(bot.config.dbURL)

fs.readdir("./src/developer/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/developer/${file}`)
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

fs.readdir("./src/premium/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/premium/${file}`)
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

fs.readdir("./src/settings/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/settings/${file}`)
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

fs.readdir("./src/staff/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/staff/${file}`)
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

fs.readdir("./src/utility/", (err, files) => {
files.forEach(file => {
if(!file.endsWith(".js")) return;
let command = require(`./src/utility/${file}`)
try {
if(command.config) {
bot.commands.set(command.config.name, command)
bot.settings.set(command.config.name, command)
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

const DBL = require("dblapi.js")   

const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDU2MTE4ODgyMjM4NDY1NiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA0MjU5NDU2fQ.-5-78ddMMYTSMaYdWOfRlSxWoJzT-_tvP17vuD-FV4U', { webhookPort: 8369, webhookAuth: "8550" })

dbl.webhook.on('ready', hook => {
console.log(`Webhook running!`);
});

dbl.webhook.on('vote', vote => {
let tyforvoting = new Discord.MessageEmbed()
.setColor("#7777f4")
.setTitle("Someone has voted on top.gg!")
.setURL('https://top.gg/bot/634561188822384656/vote')
.setDescription(`<:wumpus_luv:724672126002528298> Thank you for voting, <@${vote.user}>! You have received some rewards, Enjoy!\n\n• Access to \`re!vote claim\`\n• **Supporter** badge on your profile\n• 25% XP Boost\n\nRemember to vote every 12 hours so you can keep all those goodies!`)
.setFooter("Thank You For Supporting ReCreate!")
bot.channels.cache.get("767103210539188286").send(tyforvoting);
let guild = bot.guilds.cache.get('658824686997733399');
let role = guild.roles.cache.find(r => r.name == "ReCreate Voter");
let member = guild.members.cache.find(v => v.id == vote.user);
if(member) {
member.roles.add(role).catch(console.error)
}
});

const axios = require('axios');

const chalk = require('chalk');

async function activatePremium() {

const { data: responses } = await axios.get("https://dev.sellix.io/v1/orders", {
headers: {
Authorization: `Bearer ${bot.config.sellixkey}`
}
})
const { custom_fields } = responses.data.orders[0]
if(responses.data.status == 'PENDING') return;
if(!await bot.subdb.exists(`${custom_fields['Discord ID']}.premiumuser`)) await bot.subdb.set(`${custom_fields['Discord ID']}.premiumuser`, true)

//add a check to see if the user is in the support server and give them the donator role 

console.log(chalk.bgGreen('[User]:') + chalk.green(` Premium has been activated for ${ID}.`))

}

await activatePremium()

bot.login(bot.config.token)