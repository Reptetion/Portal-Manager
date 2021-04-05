exports.run = async(bot, message, args) => {

let reports = await bot.database.get(`reports_${message.author.id}`) || '0'

message.channel.send(`You have gotten **${reports}** bug reports approved by the Developer!`)

}

exports.config = {
name: 'reports',
description: 'Checks how many bug reports you got approved.',
usage: 'p!reports',
aliases: []
}