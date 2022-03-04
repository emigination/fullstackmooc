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

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${contacts.length} people.</div><div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(400).send({ error: 'malformatted id' })
      }
    })
    .catch(error => next(error)
  )
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
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
  contact.save()
    .then(result => {
      res.json(contact)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const contact = {
    name: req.body.name,
    number: req.body.number,
  }
  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
  .then(updated => res.json(updated))
  .catch(error => next(error))
})

app.use(errorHandler)
app.listen(PORT)
console.log(`Server running on port ${PORT}`)