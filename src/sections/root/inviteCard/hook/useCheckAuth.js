import { useCallback, useEffect } from 'react'

import { useLoginWithInvitationCode } from '@/apis/hook/use-user'
import { STORAGE_KEY } from '@/constants/jwt'
import useUserStore from '@/store/user-context'
import { isValidToken, jwtDecode } from '@/utils/utils'

function useCheckAuth() {
  const loginSuccess = useUserStore(state => state.loginSuccess)
  const { mutateAsync } = useLoginWithInvitationCode(loginSuccess)

  const checkUserSession = useCallback(async () => {
    const accessToken = sessionStorage.getItem(STORAGE_KEY)

    if (accessToken && isValidToken(accessToken)) {
      const jwtPayload = jwtDecode(accessToken)
      const payload = {
        invite_code_from_token: true,
        invitation_code: jwtPayload.sub,
      }

      await mutateAsync(payload)
    }
  }, [mutateAsync])

  useEffect(() => {
    checkUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useCheckAuth
