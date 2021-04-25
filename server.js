const express = require('express');

const http = require('http');

const app = express();

const chalk = require('chalk');

app.get("/", (request, response) => {
console.log(chalk.bgGreen('[UptimeRobot]:') + chalk.green(' Ping received.'))
response.sendStatus(200)
})
app.listen(4268)
setInterval(() => {
http.get(`http://66.11.118.236:4268/`)
}, 300000)