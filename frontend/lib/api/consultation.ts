// lib/api/consultation.ts
import { api } from '@/lib/api'

type ConsultationPayload = {
    weight: number
    height: number
    age: number
    goal: 'gain' | 'loss' | 'maintain'
    userId: number
}

export const submitConsultation = (data: ConsultationPayload) => {
    return api({ url: '/api/consultation/submit', method: 'POST', data })
}
