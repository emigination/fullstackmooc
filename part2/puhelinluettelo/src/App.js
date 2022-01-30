import React, { useState, useEffect } from 'react'
import ContactsList from './components/ContactsList'
import AddingForm from './components/AddingForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [contactsFilter, setFilter] = useState('')
  const [message, setMessage] = useState([null, null])

  useEffect(() => {
    personService.getAll().then(initialPersons => { setPersons(initialPersons) })
  }, [])

  const updateMessage = (messageText, messageType) => {
    setMessage([messageText, messageType])
    setTimeout(() => {
      setMessage([null, null])
    }, 5000)
  }

  const newPerson = () => {
    personService.newPerson(newName, newNumber)
      .then(person => {
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
        updateMessage('Added', 'success')
      })
      .catch(error => {
        updateMessage('Failed', 'fail')
      })
  }

  const editNumber = (person) => {
    personService.editNumber(person, newNumber)
      .then(editedPerson => {
        setPersons(persons.map(person => person.id === editedPerson.id ? editedPerson : person))
        setNewName('')
        setNewNumber('')
        updateMessage('Edited', 'success')
      })
      .catch(error => {
        updateMessage('Failed', 'fail')
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    const sameName = persons.filter(person => person.name === newName)
    if (sameName.length > 0) {
      if (sameName[0].number === newNumber) {
        alert(`${newName} has already been added to the phonebook with the same number!`)
      } else if (window.confirm(`${newName} has already been added to the phonebook with a different number. Replace the old number?`)) {
        editNumber(sameName[0])
      }
    } else {
      newPerson()
    }
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
        .then(result => {
          setPersons(persons.filter(person => person.id !== id))
          updateMessage('Deleted ', 'success')
        })
        .catch(error => {
          updateMessage('Failed', 'fail')
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} />
      <h3>Contacts</h3>
      <ContactsList handleFilter={handleFilter} persons={persons} contactsFilter={contactsFilter} handleDelete={handleDelete} />
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