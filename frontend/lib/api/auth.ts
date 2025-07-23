import { api } from '@/lib/api'

type AuthPayload = {
    email: string
    password: string
    name?: string // برای رجیستر، فیلد name هم باید اضافه شود
}

export const registerUser = (data: AuthPayload) => {
    // URL صحیح: شامل /auth
    return api({ url: '/api/auth/register', method: 'POST', data })
}

export const loginUser = (data: AuthPayload) => {
    // URL صحیح: شامل /auth
    return api({ url: '/api/auth/login', method: 'POST', data })
}
