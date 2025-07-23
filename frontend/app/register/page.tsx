// frontend/pages/register.tsx (یا مسیر مربوطه)
'use client'

import { useState } from 'react'
import { useRegister } from '@/lib/Hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const [name, setName] = useState('') // 👈 اضافه کردن state برای نام
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const registerMutation = useRegister()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        registerMutation.mutate(
            { name, email, password }, // 👈 ارسال نام به mutate
            {
                onSuccess: () => {
                    setName('') // پاک کردن فیلد نام بعد از موفقیت
                    setEmail('')
                    setPassword('')
                    setTimeout(() => router.push('/login'), 1500)
                },
            }
        )
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 shadow-md border rounded">
            <h1 className="text-2xl font-bold mb-4">Register</h1>

            {registerMutation.isSuccess && (
                <p className="text-green-600 mb-2">Registered successfully!</p>
            )}
            {registerMutation.isError && (
                <p className="text-red-600 mb-2">
                    {(registerMutation.error as Error).message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
                {/* 👈 اضافه کردن فیلد ورودی برای نام */}
                <div className="mb-4">
                    <label className="block mb-1">Name</label>
                    <input
                        type="text" // معمولا برای نام از type="text" استفاده می شود
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="Your Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="you@example.com"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                >
                    {registerMutation.isPending ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    )
}