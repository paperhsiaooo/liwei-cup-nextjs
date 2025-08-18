import { useQuery } from '@tanstack/react-query'

import { axsCDN } from '@/utils/axios'

// 獲取參戰宣言選項 API
async function getDeclarationsOptionsAPI() {
  const data = await axsCDN(`DeclarationsList.json`, 'v1.0.3')
  return data
}

// React Query hook 來獲取參戰宣言選項
function useDeclarationsOptions() {
  return useQuery({
    queryKey: ['declarations', 'options'],
    queryFn: getDeclarationsOptionsAPI,
    staleTime: 5 * 60 * 1000, // 5分鐘
    gcTime: 10 * 60 * 1000, // 10分鐘 (React Query v5 使用 gcTime 取代 cacheTime)
    retry: 2,
  })
}

export { getDeclarationsOptionsAPI, useDeclarationsOptions }
