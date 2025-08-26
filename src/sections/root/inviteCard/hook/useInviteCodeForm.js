import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useLoginWithInvitationCode } from '@/apis/hook/use-user'
import useUserStore from '@/store/user-context'

import formSchema from '../schema/invite-code-schema'

function useInviteCodeForm() {
  const loginSuccess = useUserStore(state => state.loginSuccess)

  const { defaultValues, baseSchema } = formSchema()

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const { mutateAsync, isPending } = useLoginWithInvitationCode(loginSuccess)

  const onSubmit = useCallback(
    async data => {
      const payload = {
        invite_code_from_token: false,
        invitation_code: data.inviteCode,
      }

      await mutateAsync(payload)
    },
    [mutateAsync],
  )

  return {
    methods,
    handleSubmit,
    onSubmit,
    isPending,
  }
}

export default useInviteCodeForm
