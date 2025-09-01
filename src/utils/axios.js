/* eslint-disable no-undef */
import _axios from 'axios'
import toast from 'react-hot-toast'

import { ERROR_CODE, SUCCESS_CODE } from '@/apis/constants/api-code'
import { STORAGE_KEY } from '@/constants/jwt'
import { URL } from '@/constants/url'

const handleCatchError = error => {
  if (error.response) {
    toast.error(error.response.statusText)
  } else {
    toast.error(`${error.code} ${JSON.stringify(error)}`)
  }

  return error
}

const axiosInstance = _axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8080'}/api`,
  timeout: 10_000,
  responseType: 'json',
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
            toast.error(errorMessage)
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
