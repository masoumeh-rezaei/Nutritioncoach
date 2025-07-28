import axiosClient from '@/lib/axiosClient'
import {api} from "@/lib/api";
type LoginData = {
    email: string
    password: string
}

export const loginUser = async (data: LoginData) => {
    return await api({
        url: '/api/auth/login',
        method: 'POST',
        data,
    })
}

export const registerUser = async (data: {
    name: string
    email: string
    password: string
}) => {
    const res = await axiosClient.post('/api/auth/register', data)
    return res.data
}
