const express = require("express");
const morgan = require("morgan");
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.static('build'))

morgan.token("req-body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :req-body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423123",
    id: 4,
  },
];

let time = Date();

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  res.send(`<div>Phonebook has info for ${persons.length} people
  <p>${time}<p>`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const id = persons.length > 0 ? Math.floor(Math.random() * 99) : 0;
  return id;
};

app.post("/api/persons", (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const duplicate = persons.find((person) => person.name === newPerson.name);

  if (duplicate) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  newPerson.id = generateId();

  persons = persons.concat(newPerson);

  res.json(newPerson);
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
