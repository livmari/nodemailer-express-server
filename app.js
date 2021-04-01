// Declaring the port to listen to
const port = process.env.PORT || 6174

// Create Express app
const express = require('express')
const app = express()

// parse application/json
app.use(express.json())

// HTTP request logger
const morgan = require('morgan')
app.use(morgan('dev'))

// Enabling cross-origin resource sharing
const cors = require('cors')
app.options('*', cors())
app.use(cors())

// Importing routes
app.get('/', async (req, res, next) => {
  try {
    res
      .status(200)
      .send(
        '<h1 style="font-family:sans-serif">💌 Hello from the mailer api!</h1>'
      )
  } catch (error) {
    next(error)
  }
})

const mailRoute = require('./routes/mail')
app.use('/mail', mailRoute)

// Not found message when fails happen
app.use('/*', (req, res) => {
  res.status(400).json({ message: 'Not found' })
})

app.listen(port, error => {
  if (error) throw error

  console.log(`✨ Server listening at port ${port}`)
})
