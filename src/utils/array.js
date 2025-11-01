/**
 * 將值轉換為陣列
 * @param {any} value - 要轉換的值
 * @returns {Array} 陣列
 */
export const toArray = value => (Array.isArray(value) ? value : [])

/**
 * 取得唯一值的陣列
 * @param {Array} list - 原始陣列
 * @returns {Array} 唯一值陣列
 */
export const uniqueList = list =>
  Array.from(
    new Set(
      (list ?? []).filter(
        item => item !== undefined && item !== null && item !== '',
      ),
    ),
  )
