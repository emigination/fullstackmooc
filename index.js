const express = require('express')
const app = express()

app.use(express.json())

let contacts = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(contacts)
})

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${contacts.length} people.</div><div>${Date()}</div>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const person = contacts.find(contact => contact.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
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

  if (contacts.some((person) => person.name === body.name)) {
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'Number missing'
    })
  }

  const contact = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random()*1000000)
  }

  contacts = contacts.concat(contact)

  res.json(contact)

  console.log(contacts)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)