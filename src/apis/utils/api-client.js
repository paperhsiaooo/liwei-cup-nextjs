import { SUCCESS_CODE } from '@/apis/constants/api-code'

/**
 * 處理 API 回應並解析 JSON
 * @param {Response} response - Fetch 回應物件
 * @param {string} errorMessage - 錯誤訊息
 * @returns {Promise<object>} 解析後的 JSON 資料
 */
export const handleApiResponse = async (response, errorMessage) => {
  if (!response.ok) {
    throw new Error(`${errorMessage} (${response.status})`)
  }

  const payload = await response.json()
  const retStatus = payload?.retStatus ?? {}
  const statusCode =
    typeof retStatus.code === 'string'
      ? Number(retStatus.code)
      : (retStatus.code ?? NaN)

  if (statusCode !== SUCCESS_CODE) {
    const error = new Error(retStatus.message ?? errorMessage)
    error.code = retStatus.code
    throw error
  }

  return payload
}
