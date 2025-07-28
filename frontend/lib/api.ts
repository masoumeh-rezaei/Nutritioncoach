// lib/api/fetcher.ts
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
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.message || 'Something went wrong')
  }

  return res.json()
}
