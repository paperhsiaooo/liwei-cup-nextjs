import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useSendFormData } from '@/apis/hook/use-user'
import useUserContext from '@/store/user-context'

import formSchema from '../schema/declaration-schema'
import useProgressContext, { STEP } from '../store/progress-context'

function useDeclarationsForm() {
  const { defaultValues, baseSchema } = formSchema()
  const user = useUserContext(state => state.user)
  const setCurrentStep = useProgressContext(state => state.setCurrentStep)
  const { mutateAsync, isPending } = useSendFormData(() => {})

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit, reset } = methods

  const onSubmit = useCallback(
    async data => {
      try {
        const payload = {
          nick_name: user.nickName,
          address: user.address,
          is_participating: user.isParticipating === 1 ? true : false,
          shirt_size: user.shirtSize,
          message_to_organizer: data.messageToOrganizer,
          battle_declaration_list: [
            Number(data.declaration1),
            Number(data.declaration2),
            Number(data.declaration3),
          ],
        }

        await mutateAsync(payload)
        setCurrentStep(STEP.COMPLETE)
      } catch (error) {}
    },
    [
      mutateAsync,
      setCurrentStep,
      user.address,
      user.isParticipating,
      user.nickName,
      user.shirtSize,
    ],
  )

  const onRefreshDeclarationSelect = useCallback(() => {
    if (!user?.isLogin) return

    let battleDeclaration = []

    if (user.battleDeclaration) {
      const [d1, d2, d3] = user.battleDeclaration.split(',')
      battleDeclaration = [d1, d2, d3]
    }

    reset({
      declaration1: String(battleDeclaration[0] ?? ''),
      declaration2: String(battleDeclaration[1] ?? ''),
      declaration3: String(battleDeclaration[2] ?? ''),
      messageToOrganizer: user.messageToOrganizer || '',
    })
  }, [reset, user])

  return {
    onRefreshDeclarationSelect,
    methods,
    handleSubmit,
    onSubmit,
    isPending,
  }
}

export default useDeclarationsForm
