import axios from 'axios'

const baseURL = 'http://127.0.0.1:5000'

const axiosClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// ▶️ Interceptor برای اضافه کردن access token به هدر
axiosClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

// 🔁 Interceptor برای handle کردن token expiration و refresh کردن token
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        // اگر توکن expire شده باشه
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem('refresh_token')
        ) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refresh_token')

                const res = await axios.post(`${baseURL}/api/auth/refresh`, {
                    refresh_token: refreshToken,
                })

                const newAccessToken = res.data.access_token
                localStorage.setItem('access_token', newAccessToken)

                // توکن جدید رو به هدر اضافه کن
                axiosClient.defaults.headers.Authorization = `Bearer ${newAccessToken}`
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

                // دوباره درخواست اصلی رو اجرا کن
                return axiosClient(originalRequest)
            } catch (refreshError) {
                console.error('Refresh token failed:', refreshError)
                // logout کاربر
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.href = '/login'
            }
        }

        return Promise.reject(error)
    }
)

export default axiosClient
