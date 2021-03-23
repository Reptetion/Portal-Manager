//made it as 'subdb' because that's ReCreate's database, not Portal Manager's, so Portal Manager's database will be called bot.database(using MongoDB via quickmongo)

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