import axiosClient from '@/lib/axiosClient'

type LoginData = {
    email: string
    password: string
}

export const loginUser = async (data: LoginData) => {
    const res = await axiosClient.post('/api/auth/login', data)
    return res.data
}

export const registerUser = async (data: {
    name: string
    email: string
    password: string
}) => {
    const res = await axiosClient.post('/api/auth/register', data)
    return res.data
}
