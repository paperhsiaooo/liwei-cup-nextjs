/* eslint-disable no-undef */
import _axios from 'axios'
import toast from 'react-hot-toast'

import { ERROR_CODE, SUCCESS_CODE } from '@/apis/constants/api-code'
import { STORAGE_KEY } from '@/constants/jwt'
import { URL } from '@/constants/url'

const handleCatchError = error => {
  if (error.response) {
    const status = error.response.status
    if (status === 401 || status === 403) {
      return error
    }
    toast.error(error.response.statusText)
  } else {
    const fallback =
      error?.message ||
      error?.code ||
      (typeof error === 'string' ? error : JSON.stringify(error))
    toast.error(fallback || 'Network error')
  }

  return error
}

// Resolve base URL for both server and client. Default to same-origin when unset.
const apiBase =
  typeof window === 'undefined'
    ? process.env.BASE_URL
    : process.env.NEXT_PUBLIC_BASE_URL

const resolvedBase = apiBase && apiBase.trim().length > 0 ? apiBase : ''

const axiosInstance = _axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${resolvedBase}/api`,
  timeout: 10_000,
  responseType: 'json',
  withCredentials: true,
})

axiosInstance.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const accessToken = sessionStorage.getItem(STORAGE_KEY)

    if (accessToken) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }
  }

  return config
})

const axs = (apiName, payload, method = 'POST') =>
  new Promise((resolve, reject) => {
    axiosInstance({
      url: apiName,
      data: payload,
      method,
    })
      .then(data => {
        if (data.data.retStatus.code === SUCCESS_CODE) {
          resolve(data.data)
        } else {
          const errorMessage =
            ERROR_CODE[data.data.retStatus.code] || '未知錯誤'

          if (ERROR_CODE[data.data.retStatus.code].isShow) {
            toast.error(errorMessage.message)
          }

          reject(data)
        }
      })
      .catch(error => {
        reject(handleCatchError(error))
      })
  })

const axsCDN = (fileName, version = 'v1.0.0') =>
  new Promise((resolve, reject) => {
    _axios({
      url: `${URL.BattleListCDN}${version}/${fileName}`,
      method: 'GET',
    })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(handleCatchError(error))
      })
  })

export default axiosInstance
export { axiosInstance, axs, axsCDN }
