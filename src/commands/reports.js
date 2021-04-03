const db = require("quick.db");

exports.run = async(client, message, args) => {

let reports = db.get(`reports_${message.author.id}`);
if(!reports) reports = "0";

message.channel.send(`You have gotten **${reports}** bug reports approved by the Developer!`);

}