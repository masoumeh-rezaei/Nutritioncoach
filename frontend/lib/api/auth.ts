import { api } from '@/lib/api'

type AuthPayload = {
    email: string
    password: string
}

export const registerUser = (data: AuthPayload) => {
    return api({ url: '/api/register', method: 'POST', data })
}

export const loginUser = (data: AuthPayload) => {
    return api({ url: '/api/login', method: 'POST', data })
}
