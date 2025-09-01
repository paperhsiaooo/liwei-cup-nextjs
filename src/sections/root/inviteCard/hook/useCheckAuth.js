import { useCallback, useEffect } from 'react'

import { ERROR_CODE } from '@/apis/constants/api-code'
import { useLoginWithInvitationCode } from '@/apis/hook/use-user'
import { ROLE } from '@/config/constants'
import { STORAGE_KEY } from '@/constants/jwt'
import useUserStore from '@/store/user-context'
import { isValidToken, jwtDecode } from '@/utils/utils'

import useProgressContext, { STEP } from '../store/progress-context'

function useCheckAuth() {
  const loginSuccess = useUserStore(state => state.loginSuccess)
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)
  const { mutateAsync } = useLoginWithInvitationCode(loginSuccess)

  const checkUserSession = useCallback(async () => {
    const accessToken = sessionStorage.getItem(STORAGE_KEY)

    if (accessToken && isValidToken(accessToken)) {
      const jwtPayload = jwtDecode(accessToken)
      try {
        const payload = {
          invite_code_from_token: true,
          invitation_code: jwtPayload.sub,
        }

        const res = await mutateAsync(payload)

        if (res.data.role === ROLE.OTHER) {
          setCurrentStep(STEP.PLAYER_INFO)
        }
      } catch (error) {
        if (error.data.retStatus.code === ERROR_CODE[112008].code) {
          sessionStorage.removeItem(STORAGE_KEY)
        }
      }
    }
  }, [mutateAsync, setCurrentStep])

  useEffect(() => {
    checkUserSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useCheckAuth
