import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.OXTRON_API || 'http://oxtronapi.somee.com',
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
