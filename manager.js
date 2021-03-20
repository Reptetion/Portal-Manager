//made it as 'subdatabase' because that's ReCreate's database, not Portal Manager's, so Portal Manager's database will be called bot.database(using MongoDB via quickmongo)

const axios = require('axios')

async function activatePremium() {
const { data: responses } = await axios.get("https://dev.sellix.io/v1/orders", {
headers: {
Authorization: "Bearer 6OHm5ZVayYmAbKnxXFVZmbUZS0egDBPwj3r8qzbxxJCMKn4PfTiyyGp6pXHf2sOo"
}
})
const { custom_fields } = responses.data.orders[0]
if(responses.data.status == 'PENDING') return;
if(!await bot.subdatabase.exists(`${custom_fields['Discord ID']}.premiumuser`)) await bot.subdatabase.set(`${custom_fields['Discord ID']}.premiumuser`, true)

//add a check to see if the user is in the support server and give them the donator role 
}