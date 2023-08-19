import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async blogData => {
  const response = await axios.post(baseUrl, blogData, { headers: { Authorization: token } })
  return response.data
}

export const update = async (blogData) => {
  const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, { headers: { Authorization: token } })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, createNew }
