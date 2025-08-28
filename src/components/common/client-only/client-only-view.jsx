'use client'

import { useIsClient } from '@uidotdev/usehooks'

function ClientOnlyView({ children }) {
  const isClient = useIsClient()

  if (!isClient) return

  return isClient ? <>{children}</> : undefined
}

export default ClientOnlyView
