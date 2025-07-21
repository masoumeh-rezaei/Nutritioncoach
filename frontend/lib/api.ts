export const api = async ({
                              url,
                              method,
                              data,
                          }: {
    url: string
    method: string
    data?: any
}): Promise<any> => {
    const res = await fetch(`http://127.0.0.1:5000${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
    })

    if (!res.ok) {
        const error = await res.json()
        throw new Error(error?.error || 'Something went wrong')
    }

    return res.json()
}
