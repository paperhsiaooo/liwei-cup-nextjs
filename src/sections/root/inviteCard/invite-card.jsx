'use client'

import { useFeatureFlagEnabled } from 'posthog-js/react'

import ProgressStep from '@/components/progress-step/progress-step'

import {
  ProgressDeclarations,
  ProgressFinish,
  ProgressInviteForm,
  ProgressPlayerInfo,
} from '.'
import useCheckAuth from './hook/useCheckAuth'
import useProgressContext, { STEP } from './store/progress-context'

function InviteCard() {
  const flagEnabled = useFeatureFlagEnabled('open-form-field')
  const currentStep = useProgressContext(state => state.currentStep)
  const stepData = useProgressContext(state => state.data)

  useCheckAuth()

  const renderCurrentStep = () => {
    if (!flagEnabled) {
      return <div>form field is not enabled</div>
    }

    switch (currentStep) {
      case STEP.INVITE_CODE:
        return <ProgressInviteForm />
      case STEP.PLAYER_INFO:
        return <ProgressPlayerInfo />
      case STEP.DECLARATIONS:
        return <ProgressDeclarations />
      case STEP.COMPLETE:
        return <ProgressFinish />
      default:
        return null
    }
  }

  return (
    <section id="invite" className="root bg-green-primary">
      <div className="wrapper max-w-[350px] mx-auto 1440:max-w-[934px]">
        {flagEnabled && (
          <>
            <div className="w-full max-w-[940px] mx-auto py-4">
              <ProgressStep currentStep={currentStep} stepData={stepData} />
            </div>
            {renderCurrentStep()}
          </>
        )}
      </div>
    </section>
  )
}

export default InviteCard
