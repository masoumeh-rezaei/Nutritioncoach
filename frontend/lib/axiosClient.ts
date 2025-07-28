import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000'

const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosClient
