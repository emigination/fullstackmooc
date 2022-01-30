import React from 'react'

const Contact = (props) => {
  return <div>{props.person.name}, {props.person.number} <button onClick={props.handleDelete}>Delete</button></div>
}

const ContactsList = (props) => {
  const personsToShow = props.contactsFilter.length > 0
  ? props.persons.filter(person => person.name.toLowerCase().includes(props.contactsFilter.toLowerCase()))
  : props.persons

  return (
    <div>
    <p>Filter: <input onChange={props.handleFilter}/></p>
    {personsToShow.map(person => <Contact key={person.id} person={person} handleDelete={() => props.handleDelete(person.id, person.name)}/>)}
    </div>
  )
}

export default ContactsList