import axiosClient from '@/lib/axiosClient'

type AuthPayload = {
    email: string
    password: string
}

export const loginUser = async (data: AuthPayload) => {
    const res = await axiosClient.post('/api/auth/login', data)


    localStorage.setItem('access_token', res.data.access_token)
    localStorage.setItem('refresh_token', res.data.refresh_token)
<<<<<<< HEAD
    console.log('refresh tocken',res.data.refresh_token)
    console.log('access tocken',res.data.access_token)
=======
    console.log('refresh',res.data.refresh_token)
    console.log('access',res.data.access_token)
>>>>>>> 75b345a2782f41af246226ae41e08128ee864c62

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
