import axios from 'axios'

export const axiosBase = axios.create({
    baseURL: "http://localhost:4000/api/public/",
    timeout: 10000,
})
