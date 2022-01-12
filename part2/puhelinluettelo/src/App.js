import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '000' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [contactsFilter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName)
    ? alert(`${newName} has already been added to the phonebook!`)
    : setPersons(persons.concat({ name: newName, number: newNumber }))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = contactsFilter.length > 0
    ? persons.filter(person => person.name.toLowerCase().includes(contactsFilter.toLowerCase()))
    : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Contacts</h3>
      <div><p>Filter: <input onChange={handleFilter}/></p></div>
      <div>{personsToShow.map(person => <div key={person.name}>{person.name}, {person.number}</div>)}</div>
      <h3>Add new</h3>
      <form onSubmit={addPerson}>
        <div>Name: <input onChange={handleNameChange}/></div>
        <div>Number: <input onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  )

}

export default App