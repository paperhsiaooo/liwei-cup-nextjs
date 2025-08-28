import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import useUserContext from '@/store/user-context'

import playerInfoSchema from '../schema/player-info-schema'
import useProgressContext, { STEP } from '../store/progress-context'

function usePlayerInfoForm() {
  const { defaultValues, baseSchema } = playerInfoSchema()
  const user = useUserContext(state => state.user)
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)
  const setPlayerInfo = useUserContext(state => state.setPlayerInfo)

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, watch, reset } = methods

  const isParticipating = watch('isParticipating')

  const onSubmit = useCallback(
    data => {
      setPlayerInfo(data)
      setCurrentStep(STEP.DECLARATIONS)
    },
    [setCurrentStep, setPlayerInfo],
  )

  useEffect(() => {
    if (!user?.isLogin) return

    reset({
      nickName: user.nickName,
      isParticipating: user.isParticipating ? 1 : 0,
      address: user.address,
      shirtSize: user.shirtSize,
    })
  }, [reset, user])

  return {
    user,
    methods,
    isParticipating,
    handleSubmit,
    onSubmit,
  }
}

export default usePlayerInfoForm
