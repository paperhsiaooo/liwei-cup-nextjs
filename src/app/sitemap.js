export const dynamic = 'force-static'

export default function sitemap() {
  const baseUrl = 'https://liwei-cup.com'

  return [
    {
      url: baseUrl,
      lastModified: '2026-06-19',
      changeFrequency: 'daily',
      priority: 1,
    },
  ]
}
