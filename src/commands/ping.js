exports.run = async(bot, message, args) => {
    
let ping = await bot.database.fetchLatency()
let ping2 = await bot.subdb.fetchLatency()
    
message.channel.send('Getting Ping...').then(msg => {
msg.edit(`Bot: ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms\nAPI: ${Math.round(bot.ws.ping)}ms\nMainDB: ${Math.round(ping.average)}ms\nSubDB: ${Math.round(ping2.average)}ms`)
})
    
}

exports.config = {
name: 'ping',
description: 'Pong!',
usage: 'ping',
aliases: []
}