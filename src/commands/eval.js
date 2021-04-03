const Discord = require("discord.js");

const db = require("quick.db");

exports.run = async (client, message, args) => {

if (message.author.id !== "251143265271808001")
return message.channel.send("Sorry, only my master can use that!") 
     
  function clean(text) {
    if (typeof text === "string") {
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    }
    return text;
  }

  function token(input) {
    if (typeof input === "string") {
      return input.replace(message.client.token);
    } else if (typeof input === "object") {
      if (Array.isArray(input)) {
        function hasToken(value) {
          if (typeof value !== "string") {
            return true;
          }

          return value !== message.client.token;
        }
        return input.filter(hasToken);
      }
      return input;
    }

    return input;
  }

  try {
    let code = args.join(" ");
    let evaled = eval(code);
    let func = token(clean(evaled));
    if (typeof func !== "string") {
      func = require("util").inspect(func);
    }
    const output = "```js\n" + func + "\n```";
    const Input = "```js\n" + message.content.slice(6) + "\n```";
    let type = typeof evaled;

      if(func.length < 1024) {
      const embed = new Discord.MessageEmbed()
        .addField("Eval Output", `**Type:** ${type}`)
        .addField(":inbox_tray: Input", Input)
        .addField(":outbox_tray: Output", output)
        .setColor('#7777f4')
        .setTimestamp();
      message.channel.send({ embed });

      } else {
       const embed = new Discord.MessageEmbed()
        .addField("Eval Output", `**Type:** ${type}`)
        .addField(":inbox_tray: Input", Input)
        .addField(":outbox_tray: Output", "```4268: To long to display```")
        .setColor('#7777f4')
        .setTimestamp();
      message.channel.send({ embed });
      }
  } catch (err) {
    let errIns = require("util").inspect(err);
    const error = "```js\n" + errIns + "\n```";
    const Input = "```js\n" + message.content.slice(6) + "\n```";
    if (errIns.length < 1000) {
      const embed = new Discord.MessageEmbed()
        .addField("Evaluation Error", `**Type:** Error`)
        .addField(":inbox_tray: Input", Input)
        .addField(":x: Error", error, true)
        .setColor('#7777f4');
      message.channel.send({ embed });
    } else {
          const embed = new Discord.MessageEmbed()
            .setTitle("Evaluation Error")
            .addField("Evaluation", `**Type:** Error`)
            .addField(":inbox_tray: Input", Input)
            .addField(
              ":x: Error",
              "```" + err.name + ": " + err.message + "```",
              true
            )
            .setColor('#7777f4')
          message.channel.send({ embed });

    }
  }
};