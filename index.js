const express = require('express')
const util = require('util')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
    console.log(req.query)

    console.log(util.inspect(req.query, {showHidden: false, depth: null, colors: true}))

    // alternative shortcut
    console.log(util.inspect(req.query, false, null, true /* enable colors */))
    
    res.status(200).send(req.query['hub.challenge']);
})

app.post('/', (req, res) => {
    console.log(req.body)
    console.log(util.inspect(req.body, {showHidden: false, depth: null, colors: true}))
    // alternative shortcut
    console.log(util.inspect(req.body, false, null, true /* enable colors */))
    res.send(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})