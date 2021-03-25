exports.run = async(bot, message, args) => {

let reports = await bot.database.get(`${message.author.id}.reports`) || '0'

message.channel.send(`You have gotten ${reports} bug reports approved by the developer!`)

}  

exports.config = {
name: 'reports',
description: 'Checks how many bug reports you got approved.',
usage: 'reports',
aliases: []
}