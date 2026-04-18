import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://task-manager-knb8cg.fly.dev',
})
instance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem('accessToken')) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken')
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
instance.interceptors.response.use(
  function onFulfilled(response) {
    return response
  },
  async function onRejected(error) {
    const originalRequest = error.config
    if (
      error.response &&
      (error.response.status == 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
        } else {
          const response = await axios.post('https://task-manager-knb8cg.fly.dev/refresh', {
            refreshToken: refreshToken,
          })
          localStorage.setItem('accessToken', response.data.accessToken)
          originalRequest.headers.Authorization = 'Bearer ' + response.data.accessToken
          return instance(originalRequest)
        }
      } catch (error) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)
export default instance
