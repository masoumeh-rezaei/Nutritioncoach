// app/form/page.tsx
'use client'

import { useState } from 'react'
import { useConsultation } from '@/lib/Hooks/useConsultation'

export default function ConsultationFormPage() {
    const [form, setForm] = useState({
        weight: '',
        height: '',
        age: '',
        goal: 'maintain',
        userId: '',
    })

    const { mutate, isPending, isSuccess, isError, error } = useConsultation()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        mutate({
            weight: Number(form.weight),
            height: Number(form.height),
            age: Number(form.age),
            goal: form.goal as 'gain' | 'loss' | 'maintain',
            userId: Number(form.userId), // userId را از فرم می‌خوانیم
        })
    }

    return (
        <div className="max-w-md mx-auto p-6 rounded-xl shadow-md mt-10 bg-white">
            <h2 className="text-2xl font-bold mb-4">Nutrition Consultation</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="number"
                    name="weight"
                    placeholder="Weight (kg)"
                    value={form.weight}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
                    value={form.height}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />

                <select
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                >
                    <option value="gain">Gain Weight</option>
                    <option value="loss">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                </select>


                <input
                    type="number"
                    name="userId"
                    placeholder="User ID"
                    value={form.userId}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"

                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    disabled={isPending}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </button>

                {isSuccess && <p className="text-green-600 mt-2">Submitted successfully!</p>}
                {isError && <p className="text-red-600 mt-2">Error: {error.message}</p>}
            </form>
        </div>
    )
}