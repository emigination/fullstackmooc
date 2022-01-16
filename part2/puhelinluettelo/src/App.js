import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ContactsList from './components/ContactsList'
import AddingForm from './components/AddingForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [contactsFilter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {setPersons(response.data)})
  }, [])

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

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Contacts</h3>
      <ContactsList handleFilter={handleFilter} persons={persons} contactsFilter={contactsFilter} />
      <h3>Add new</h3>
      <AddingForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
    </div>
  )
}

export default App