import { useMutation } from '@tanstack/react-query'
import { registerUser ,loginUser } from '@/lib/api/auth'
import {useRouter} from "next/navigation";
import {api} from "@/lib/api";
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

type LoginPayload = {
    email: string
    password: string
}

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: (data: LoginPayload) => api({
            url: '/api/auth/login',
            method: 'POST',
            data,
        }),
        onSuccess: (response) => {
            localStorage.setItem('access_token', response.access_token)
            localStorage.setItem('refresh_token', response.refresh_token)
            router.push('/form') // یا هر صفحه‌ای که بعد از لاگین می‌ری
            console.log('reftesh',response.refresh_token)
            console.log('access',response.access_token)
        },
    })
}
