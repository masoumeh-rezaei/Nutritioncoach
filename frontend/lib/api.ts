export const api = async ({
                              url,
                              method,
                              data,
                          }: {
    url: string
    method: string
    data?: any
}): Promise<any> => {
    const token = localStorage.getItem('access_token')

    const res = await fetch(`http://127.0.0.1:5000${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: data ? JSON.stringify(data) : undefined,
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({}))
        throw new Error(error?.message || 'Something went wrong')
    }

    return res.json()
}
