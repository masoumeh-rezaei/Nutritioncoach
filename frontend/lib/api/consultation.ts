export const submitConsultation = async (data: {
    weight: number;
    height: number;
    age: number;
    goal: 'gain' | 'loss' | 'maintain';
    userId:number
}) => {
    const res = await fetch('/api/consultation/submit', {
        method: 'POST',
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error('Failed to submit consultation');
    }

    return res.json();
};
