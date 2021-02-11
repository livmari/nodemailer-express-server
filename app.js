const express = require('express')

const mailRoute = require('./routes/mail')

const app = express()
const port = 1337

// parse application/json
app.use(express.json())

// To test api
app.get('/', async (req, res, next) => {
    try {
        res.status(200).send('Hello world!')
    } catch (error) {
        next(error)
    }
})

app.use('/mail', mailRoute)

app.listen(port, () => {
    console.log(`✨ Server listening at port ${port}`)
})