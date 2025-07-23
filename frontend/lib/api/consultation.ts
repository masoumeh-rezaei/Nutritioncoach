// lib/api/consultation.ts
import { api } from '@/lib/api'

type ConsultationPayload = {
    weight: number
    height: number
    age: number
    goal: 'gain' | 'loss' | 'maintain'
}

export const submitConsultation = (data: ConsultationPayload) => {
    return api({ url: '/api/consultation', method: 'POST', data })
}
