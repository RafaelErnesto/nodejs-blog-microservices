const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.post('/events', async (req,res) => {

    const { type, data } = req.body

    if(type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved'

        await axios.post('http://event-bus-srv:7000/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch(err => console.log(err) )
    }
    res.send({})
})

app.listen(9500, () => {
    console.log('Listening at port 9500')
})