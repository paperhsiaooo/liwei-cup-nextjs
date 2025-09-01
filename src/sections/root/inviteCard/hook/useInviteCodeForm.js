import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { ERROR_CODE } from '@/apis/constants/api-code'
import { useLoginWithInvitationCode } from '@/apis/hook/use-user'
import { ROLE } from '@/config/constants'
import useDialogContext from '@/store/dialog-context'
import useUserStore from '@/store/user-context'

import formSchema from '../schema/invite-code-schema'
import useProgressContext, { STEP } from '../store/progress-context'

function useInviteCodeForm() {
  const setIsOpen = useDialogContext(state => state.setIsOpen)
  const loginSuccess = useUserStore(state => state.loginSuccess)
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)

  const { defaultValues, baseSchema } = formSchema()

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const { mutateAsync, isPending } = useLoginWithInvitationCode(loginSuccess)

  const onSubmit = useCallback(
    async data => {
      try {
        const payload = {
          invite_code_from_token: false,
          invitation_code: data.inviteCode,
        }

        const res = await mutateAsync(payload)

        if (res.data.role === ROLE.OTHER) {
          setCurrentStep(STEP.PLAYER_INFO)
        }
      } catch (error) {
        if (error.data.retStatus.code === ERROR_CODE[112008].code) {
          setIsOpen(true)
        }
      }
    },
    [mutateAsync, setCurrentStep, setIsOpen],
  )

  return {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
  }
}

export default useInviteCodeForm
