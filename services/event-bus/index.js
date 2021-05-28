const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

app = express()
app.use(bodyParser.json())

const events = []


app.post('/events', (req, res) => {
    const event  =req.body
    events.push(event)

    axios.post('http://localhost:4000/events', event)
        .catch(err => console.log(err))

    axios.post('http://localhost:5000/events', event)
        .catch(err => console.log(err))

    axios.post('http://localhost:9000/events', event)
        .catch(err => console.log(err))

    axios.post('http://localhost:9500/events', event)
        .catch(err => console.log(err))

    res.send({status: 'ok'})
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(7000,() => {
    console.log('Listening on port 7000')
})