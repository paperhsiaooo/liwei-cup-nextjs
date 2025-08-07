'use client'

import useUserContext from '@/store/user-context'

import { InviteForm, UserForm } from '.'

function InviteCard() {
  const user = useUserContext(state => state.user)

  return (
    <section className="root bg-green-primary">
      <div className="wrapper">
        {user.isLogin ? <UserForm user={user} /> : <InviteForm />}
      </div>
    </section>
  )
}

export default InviteCard
