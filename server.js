const http = require("http")
const express = require('express');
const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " ping recieved.");
response.sendStatus(200);
});
app.listen(22)
setInterval(() => {
http.get(`http://66.11.118.236:22/`);
}, 280000);