/**
 * 解析基礎 URL（根據環境）
 * @returns {string} 基礎 URL
 */
export const resolveBaseUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.BASE_URL ?? ''
  }

  return process.env.NEXT_PUBLIC_BASE_URL ?? ''
}

/**
 * 建構完整的 API endpoint
 * @param {string} path - API 路徑
 * @returns {string} 完整的 endpoint URL
 */
export const buildEndpoint = path => {
  const base = resolveBaseUrl().replace(/\/+$/, '')
  return base ? `${base}${path}` : path
}
