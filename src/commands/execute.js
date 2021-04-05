const shell = require('child_process');

const chalk = require("chalk");

exports.run = async(bot, message, args) => {
    
if(message.author.id !== bot.config.dev) return;
        
if(!args.join(' ')) return message.channel.send('Please provide some arguments.')
        
function clean(text) {
if(typeof(text) == "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
else return text;
}
        
try {
let output = shell.execSync(args.join(' ')).toString()
    
if(typeof output !== "string") output = require('util').inspect(output)
message.channel.send(clean(output).substr(0, 1990) || 'No stdout', { code: "xl" })

} catch(err) {
message.channel.send(`\`\`\`xl\nERROR:\n${clean(err)}\n\`\`\``)
console.log(chalk.bgCyan('[Bot]:') + chalk.cyan(` ${err}`))
}
        
}
    
exports.config = {
name: 'execute',
description: 'Executes shell commands.',
usage: 'p!execute <command>',
aliases: [ 'exec' ]
}