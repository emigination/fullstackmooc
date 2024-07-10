import axios from 'axios';
const baseUrl = '/api/users';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getById = async data => {
  const id = data.queryKey[1];
  if (!id) return null;

  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data || null);
};

export default { getAll, getById };
