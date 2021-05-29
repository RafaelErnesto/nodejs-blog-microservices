const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

app = express()
app.use(bodyParser.json())

const events = []


app.post('/events', (req, res) => {
    console.log(req.body)
    const event  =req.body
    events.push(event)

    axios.post('http://posts-clusterip-srv:4000/events', event)
        .catch(err => console.log(err))

    axios.post('http://comments-srv:5000/events', event)
        .catch(err => console.log(err))

    axios.post('http://query-srv:9000/events', event)
        .catch(err => console.log(err))

    axios.post('http://moderation-srv:9500/events', event)
        .catch(err => console.log(err))

    res.send({status: 'ok'})
})

app.get('/events', (req, res) => {
    res.send(events)
})

app.listen(7000,() => {
    console.log('Listening on port 7000')
})