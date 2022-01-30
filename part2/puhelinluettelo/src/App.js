import React, { useState, useEffect } from 'react'
import ContactsList from './components/ContactsList'
import AddingForm from './components/AddingForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [contactsFilter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(initialPersons =>
      { setPersons(initialPersons) })
  }, [])

  const newPerson = () => {
    personService.newPerson(newName, newNumber).then(person => {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    })
  }

  const addPerson = (event) => {
    event.preventDefault()
    persons.some(person => person.name === newName)
      ? alert(`${newName} has already been added to the phonebook!`)
      : newPerson()
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

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter(person => person.id!==id))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h3>Contacts</h3>
      <ContactsList handleFilter={handleFilter} persons={persons} contactsFilter={contactsFilter} handleDelete={handleDelete}/>
      <h3>Add new</h3>
      <AddingForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
    </div>
  )
}

export default App