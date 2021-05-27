const express = require('express')
const { randomBytes } = require('crypto')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || []
   
    comments.push({id: commentId, content})

    commentsByPostId[req.params.id] = comments

    await axios.post('http://localhost:7000/events',{
        type: 'CommentCreated',
        data: {
            id: commentId,
             content: content,
             postId: req.params.id
        }
    })

    res.status(201).send(comments)
})

app.listen(5000, () => {[
    console.log('Listening on 5000')
]})