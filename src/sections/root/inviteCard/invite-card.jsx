'use client'

import ProgressStep from '@/components/progress-step/progress-step'

import { ProgressDeclarations, ProgressInviteForm, ProgressPlayerInfo } from '.'
import useCheckAuth from './hook/useCheckAuth'
import useProgressContext, { STEP } from './store/progress-context'

function InviteCard() {
  const currentStep = useProgressContext(state => state.currentStep)
  const stepData = useProgressContext(state => state.data)

  useCheckAuth()

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEP.INVITE_CODE:
        return <ProgressInviteForm />
      case STEP.PLAYER_INFO:
        return <ProgressPlayerInfo />
      case STEP.DECLARATIONS:
        return <ProgressDeclarations />
      case STEP.COMPLETE:
        return <ProgressPlayerInfo />
      default:
        return null
    }
  }

  return (
    <section className="root bg-green-primary">
      <div className="wrapper max-w-[350px] mx-auto">
        <div className="w-full max-w-[940px] mx-auto py-4">
          <ProgressStep currentStep={currentStep} stepData={stepData} />
        </div>
        {renderCurrentStep()}
      </div>
    </section>
  )
}

export default InviteCard
