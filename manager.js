const axios = require('axios')

async function Premium() {
const { data: responses } = await axios.get("https://dev.sellix.io/v1/orders", {
headers: {
Authorization: "Bearer 6OHm5ZVayYmAbKnxXFVZmbUZS0egDBPwj3r8qzbxxJCMKn4PfTiyyGp6pXHf2sOo"
}
})
const { custom_fields } = responses.data.orders[0]
if(responses.data.status == 'PENDING') return;
await bot.database.set(`${custom_fields['Discord ID']}.premiumuser`, true)
}
