import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import playerInfoSchema from '../schema/player-info-schema'
import useProgressContext, { STEP } from '../store/progress-context'

function usePlayerInfoForm() {
  const { defaultValues, baseSchema } = playerInfoSchema()
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, watch } = methods

  const isParticipating = watch('isParticipating')

  const onSubmit = useCallback(
    data => {
      console.log(data)
      setCurrentStep(STEP.DECLARATIONS)
    },
    [setCurrentStep],
  )

  return {
    methods,
    isParticipating,
    handleSubmit,
    onSubmit,
  }
}

export default usePlayerInfoForm
