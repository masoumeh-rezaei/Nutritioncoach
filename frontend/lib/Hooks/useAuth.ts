import { useMutation } from '@tanstack/react-query'
import { registerUser ,loginUser } from '@/lib/api/auth'

type RegisterData = {
    name: string // 👈 اضافه کردن فیلد نام
    email: string
    password: string
}

export const useRegister = () => {
    return useMutation<unknown, Error, RegisterData>({
        mutationFn: registerUser,
    })
}

type LoginData = {
    email: string
    password: string
}

export const useLogin = () => {
    return useMutation<unknown, Error, LoginData>({
        mutationFn: loginUser,
    })
}