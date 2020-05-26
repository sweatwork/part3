const express = require('express')
const app = express()

app.use(express.json())

let persons =  [
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
      "number": "39-23-6423123",
      "id": 4
    }
  ]

  let time = Date()

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/info', (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people
  <p>${time}<p>`)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id )
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  const id = persons.length > 0 
  ? Math.floor(Math.random() * 99)
  : 0

  return id
}

app.post('/api/persons', (req, res) => {
  // console.log('req headers', req.headers)
  // console.log('post request', person)
  
  const person = req.body
  person.id = generateId()
  
  persons = persons.concat(person)

  res.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)