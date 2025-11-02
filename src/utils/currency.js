const formatCurrencyNT = value => {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return `NT$ ${value.toLocaleString('zh-TW')}`
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return ''
    if (/^NT\$/i.test(trimmed)) {
      const numeric = Number(trimmed.replace(/[^\d.]/g, ''))
      if (!Number.isNaN(numeric)) {
        return `NT$ ${numeric.toLocaleString('zh-TW')}`
      }

      return trimmed.replace(/^NT\$/i, 'NT$ ')
    }

    const numeric = Number(trimmed.replace(/[^\d.]/g, ''))
    if (!Number.isNaN(numeric)) {
      return `NT$ ${numeric.toLocaleString('zh-TW')}`
    }

    return trimmed
  }

  return ''
}

export { formatCurrencyNT }
