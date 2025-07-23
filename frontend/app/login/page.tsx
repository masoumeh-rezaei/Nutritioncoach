'use client'

import { useState } from 'react'
import { useLogin } from '@/lib/Hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const loginMutation = useLogin()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    setEmail('')
                    setPassword('')
                    setTimeout(() => router.push('/form'), 1500)
                },
            }
        )
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 shadow-md border rounded">
            <h1 className="text-2xl font-bold mb-4">Login</h1>

            {loginMutation.isSuccess && (
                <p className="text-green-600 mb-2">Login successful!</p>
            )}
            {loginMutation.isError && (
                <p className="text-red-600 mb-2">
                    {(loginMutation.error as Error).message}
                </p>
            )}

            <form onSubmit={handleSubmit}>
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
                    disabled={loginMutation.isPending}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                >
                    {loginMutation.isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    )
}
