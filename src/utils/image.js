/**
 * 從圖片物件或字串中提取 URL
 * @param {string|object} image - 圖片資料
 * @returns {string|null} 圖片 URL
 */
export const extractImageUrl = image => {
  if (!image) return null
  if (typeof image === 'string') return image
  if (typeof image === 'object') {
    if (typeof image.url === 'string') {
      return image.url
    }
    if (typeof image.src === 'string') {
      return image.src
    }
  }
  return null
}
