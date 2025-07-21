import { useMutation } from '@tanstack/react-query'
import { registerUser ,loginUser } from '@/lib/api/auth'

type RegisterData = {
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
