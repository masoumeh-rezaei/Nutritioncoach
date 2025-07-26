import axiosClient from '@/lib/axiosClient'

export const submitConsultation = async (data: {
    weight: number
    height: number
    age: number
    goal: 'gain' | 'loss' | 'maintain'
}) => {
    const res = await axiosClient.post('/api/consultation/submit', data)
    return res.data
}
