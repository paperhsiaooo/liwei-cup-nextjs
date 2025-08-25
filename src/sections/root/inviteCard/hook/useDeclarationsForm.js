import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm as useReactHookForm } from 'react-hook-form'

import { useSendFormData } from '@/apis/hook/use-user'
import useUserContext from '@/store/user-context'

import formSchema from '../schema/declaration-schema'

function useDeclarationsForm() {
  const { defaultValues, baseSchema } = formSchema()
  const user = useUserContext(state => state.user)
  const { mutateAsync, isPending } = useSendFormData(() => {})

  const methods = useReactHookForm({
    resolver: zodResolver(baseSchema),
    defaultValues,
  })

  const { handleSubmit } = methods

  const onSubmit = useCallback(
    async data => {
      const payload = {
        nick_name: user.nickName,
        address: user.address,
        is_participating: user.isParticipating === 1 ? true : false,
        shirt_size: user.shirtSize,
        message_to_organizer: user.messageToOrganizer,
        battle_declaration_list: [
          Number(data.declaration1),
          Number(data.declaration2),
          Number(data.declaration3),
        ],
      }

      await mutateAsync(payload)
    },
    [
      mutateAsync,
      user.address,
      user.isParticipating,
      user.messageToOrganizer,
      user.nickName,
      user.shirtSize,
    ],
  )

  return {
    methods,
    handleSubmit,
    onSubmit,
  }
}

export default useDeclarationsForm
