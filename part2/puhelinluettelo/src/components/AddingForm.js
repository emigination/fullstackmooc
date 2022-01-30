import React from "react"

const AddingForm = (props) => {
    return (
      <form onSubmit={props.addPerson}>
          <div>Name: <input onChange={props.handleNameChange} value={props.newName}/></div>
          <div>Number: <input onChange={props.handleNumberChange} value={props.newNumber}/></div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
    )
  }

  export default AddingForm