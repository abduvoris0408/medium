import axios from 'axios'

const API_URL = 'https://asadbek6035.pythonanywhere.com/'

export const apiClient = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

apiClient.interceptors.response.use(
	response => response,
	async error => {
		if (error.response?.status === 401) {
			console.warn('Unauthorized! Logging out...')
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			window.location.href = '/login'
		}
		return Promise.reject(error)
	}
)
