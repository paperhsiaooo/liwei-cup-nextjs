import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import playerInfoSchema from '../schema/player-info-schema'

function usePlayerInfoForm() {
  const { defaultValues, baseSchema } = playerInfoSchema()

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(data => {
    console.log(data)
  }, [])

  return {
    methods,
    handleSubmit,
    onSubmit,
  }
}

export default usePlayerInfoForm
