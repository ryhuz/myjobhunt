import axios from 'axios'

export const axiosBase = axios.create({
    baseURL: "http://localhost:4000/api/public/",
    timeout: 10000,
})

export const axiosJobs = axios.create({
    baseURL: "http://localhost:4000/api/jobs/",
    timeout: 10000,
    headers: {
        token: localStorage.getItem('mjh_user_token'),
    }
})