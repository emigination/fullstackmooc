import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const newPerson = (newName, newNumber) => {
  return axios.post(baseUrl, { name: newName, number: newNumber }).then(response => response.data)
}

export default { getAll, newPerson }