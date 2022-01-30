import React from "react"

const Notification = ({ message }) => {

  const successStyle = {
    color: 'green',
    fontSize: 18
  }
  const errorStyle = {
    color: 'red',
    fontSize: 18
  }

  const style = message[1] === 'success' ? successStyle : errorStyle
  const messageText = message[1] === 'success' ? `${message[0]} successfully!` : message[0]

  return <div style={style}>{messageText}</div>
}

export default Notification