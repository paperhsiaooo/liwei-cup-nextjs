'use client'

import useUserContext from '@/store/user-context'

import { InviteForm, UserForm } from '.'

function InviteCard() {
  const user = useUserContext(state => state.user)

  return (
    <section className="root bg-gray-300">
      <div className="wrapper min-h-[400px]">
        {user.isLogin ? <UserForm /> : <InviteForm />}
      </div>
    </section>
  )
}

export default InviteCard
