import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div>
      {notification.map((message, index) => <div style={style} key={index}> {message} </div>)}
    </div>)
}

export default Notification
