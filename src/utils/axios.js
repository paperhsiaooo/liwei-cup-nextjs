/* eslint-disable no-undef */
import _axios from 'axios'
import toast from 'react-hot-toast'

import { SUCCESS_CODE } from '@/apis/constants/api-code'

const handleCatchError = error => {
  if (error.response) {
    toast.error(error.response.statusText)
  } else {
    toast.error(`${error.code} ${JSON.stringify(error)}`)
  }

  return error
}

const axios = (
  baseURL = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://127.0.0.1:8080'}/api`,
  method = 'POST',
  credentials = false,
) => {
  const instance = _axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: credentials,
    baseURL,
    method,
    timeout: 10_000,
    responseType: 'json',
  })

  return instance
}

const axs = (apiName, payload, method) =>
  new Promise((resolve, reject) => {
    axios()({
      url: apiName,
      data: payload,
      method,
    })
      .then(data => {
        if (data.data.retStatus.StatusCode === SUCCESS_CODE) {
          resolve(data.data)
        } else {
          toast.error(
            `StatusCode: ${data.data.retStatus.StatusCode} / StatusMsg: ${data.data.retStatus.StatusMsg}`,
          )
          reject(data)
        }
      })
      .catch(error => {
        reject(handleCatchError(error))
      })
  })

export default axios
export { axs }
