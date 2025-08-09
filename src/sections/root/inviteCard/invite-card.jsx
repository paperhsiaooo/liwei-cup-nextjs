'use client'

import ProgressStep from '@/components/progress-step/progress-step'
import useUserContext from '@/store/user-context'

import { ProgressInviteForm, ProgressUserForm } from '.'
import useProgressContext from './store/progress-context'

function InviteCard() {
  const user = useUserContext(state => state.user)
  const currentStep = useProgressContext(state => state.currentStep)
  const stepData = useProgressContext(state => state.data)

  return (
    <section className="root bg-green-primary">
      <div className="wrapper max-w-[350px] mx-auto">
        <div className="w-full max-w-[940px] mx-auto py-4">
          <ProgressStep currentStep={currentStep} stepData={stepData} />
        </div>
        {user.isLogin ? (
          <ProgressUserForm user={user} />
        ) : (
          <ProgressInviteForm />
        )}
      </div>
    </section>
  )
}

export default InviteCard
