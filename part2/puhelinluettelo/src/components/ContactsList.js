import React from 'react'

const Contact = (props) => {
  return <div>{props.person.name}, {props.person.number}</div>
}

const ContactsList = (props) => {
  const personsToShow = props.contactsFilter.length > 0
  ? props.persons.filter(person => person.name.toLowerCase().includes(props.contactsFilter.toLowerCase()))
  : props.persons

  return (
    <div>
    <p>Filter: <input onChange={props.handleFilter}/></p>
    {personsToShow.map(person => <Contact key={person.name} person={person} />)}
    </div>
  )
}

export default ContactsList