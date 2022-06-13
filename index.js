const util = require('util')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/', (req, res) => {
    console.log(req.query)

    console.log(util.inspect(req.query, {showHidden: false, depth: null, colors: true}))

    // alternative shortcut
    console.log(util.inspect(req.query, false, null, true /* enable colors */))
    
    res.status(200).send(req.query['hub.challenge']);
})

app.post('/', (req, res) => {
    console.log(req.body)
    // console.log(util.inspect(req.body, {showHidden: false, depth: null, colors: true}))
    // alternative shortcut
    // console.log(util.inspect(req.body, false, null, true /* enable colors */))/
    console.log(JSON.stringify(req.body, null, 4));
    res.send(req.body)
})
io.on('connection', (socket) => {
  console.log('a user connected');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})