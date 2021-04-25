const http = require("http")
const express = require('express');
const app = express();
app.get("/", (request, response) => {
console.log(Date.now() + " ping recieved.");
response.sendStatus(200);
});
app.listen(4268)
setInterval(() => {
http.get(`http://66.11.118.236:4268/`);
}, 280000);