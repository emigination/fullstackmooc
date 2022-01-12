import React from "react"

const AddingForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
          <div>Name: <input onChange={props.handleNameChange}/></div>
          <div>Number: <input onChange={props.handleNumberChange}/></div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
    )
  }

  export default AddingForm