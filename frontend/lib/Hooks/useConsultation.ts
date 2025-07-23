// hooks/useConsultation.ts
import { useMutation } from '@tanstack/react-query'
import { submitConsultation } from '@/lib/api/consultation'

type ConsultationPayload = {
    weight: number
    height: number
    age: number
    goal: 'gain' | 'loss' | 'maintain'
}

export const useConsultation = () => {
    return useMutation<unknown, Error, ConsultationPayload>({
        mutationFn: submitConsultation,
    })
}