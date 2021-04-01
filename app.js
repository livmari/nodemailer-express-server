const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const mailRoute = require('./routes/mail')

// Declaring the port to listen to
const port = process.env.PORT || 6174

// Create Express app
const app = express()

// parse application/json
app.use(express.json())

// HTTP request logger
app.use(morgan('dev'))

// Enabling cross-origin resource sharing
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

app.use('/mail', mailRoute)

// Not found message when fails happen
app.use('/*', (req, res) => {
  res.status(400).json({ message: 'Not found' })
})

app.listen(port, error => {
  if (error) throw error

  console.log(`✨ Server listening at port ${port}`)
})
