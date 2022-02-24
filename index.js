require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
var morgan = require('morgan')
const Contact = require('./models/contact')
const { response } = require('express')
const PORT = process.env.PORT

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.data(req, res)
  ].join(' ')
}))

// let contacts = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Ada Lovelace",
//     "number": "39-44-5323523",
//     "id": 2
//   },
//   {
//     "name": "Dan Abramov",
//     "number": "12-43-234345",
//     "id": 3
//   },
//   {
//     "name": "Mary Poppendieck",
//     "number": "39-23-6423122",
//     "id": 4
//   }
// ]

app.get('/api/persons', (req, res) => {
  Contact.find({}).then(result => {
    res.json(result)
  })
})

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${contacts.length} people.</div><div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
  Contact.findById(req.params.id).then(contact => {
    res.json(contact)
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  contacts = contacts.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({
      error: 'Name missing'
    })
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'Number missing'
    })
  }
  const contact = new Contact({
    name: body.name,
    number: body.number,
  })
  contact.save().then(result => {
    res.json(contact)
    mongoose.connection.close()
  })
})

app.listen(PORT)
console.log(`Server running on port ${PORT}`)