const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())
console.log('v101')
const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts/create',async  (req, res) => {
    const id = randomBytes(4).toString('hex')
    const { title } = req.body

    posts[id] = {
        id, title
    }

    try {
        await axios.post('http://event-bus-srv:7000/events',{
            type: 'PostCreated',
            data: {
                id, title
            }
        })
    
        res.status(201).send(posts[id])
    } catch(err) {
        console.log(err)
    }

})

app.post('/events', (req, res) => {
    res.send({})
})

app.listen(4000, () => {[
    console.log('Listening on 4000')
]})