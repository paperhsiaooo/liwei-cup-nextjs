import ProgressPoint from './progress-point'

export default function ProgressStep({ currentStep = 0, stepData = [] }) {
  return (
    <div className="relative px-1 flex justify-between items-center">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full border-white border-t-2 border-dotted" />
      {stepData.map(item => (
        <div key={item.step} className="relative top-3">
          <ProgressPoint active={currentStep === item.step} text={item.title} />
        </div>
      ))}
    </div>
  )
}
