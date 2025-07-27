export default function ProgressPoint({ text = '' }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="w-3 h-3 bg-white rounded-full block" />
      <p className="text-white text-base">{text}</p>
    </div>
  )
}
