const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = {}


const handleEvents = (type, data) => {
    if(type === 'PostCreated') {
        const { id, title } = data
        posts[id] = { id, title, comments: []}
    }

    if(type === 'CommentCreated') {
        const { id, content, postId, status } = data

        posts[postId].comments.push({ id, content, status })
    }

    if(type === 'CommentUpdated') {
        const { id, content, postId, status } = data

        const comment = posts[postId].comments.find(comment => comment.id === id)
        
        comment.status = status
        comment.content = content
    }
}

app.get('/posts', (req,res) => {
    res.send(posts)
})

app.post('/events', (req,res) => {
    const { type, data } = req.body
    handleEvents(type, data)
    res.send({})
})


app.listen(9000, async () => {
    console.log('Query server listening in 9000')

    const { data } = await axios.get('http://event-bus-srv:7000/events').catch(err => console.log(err))

    for(let event of data) {
        handleEvents(event.type, event.data)
    }
})