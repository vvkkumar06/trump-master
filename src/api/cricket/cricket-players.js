import axios from 'axios';
const BASE_PATH = 'http://192.168.29.168:8080/cricket'

export const getAll = () => {
  return axios.get(`${BASE_PATH}/players`)
}

