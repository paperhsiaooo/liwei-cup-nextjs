import ProgressPoint from './progress-point'

export default function ProgressStep() {
  return (
    <div className="relative px-1 flex justify-between items-center">
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full border-white border-t-2 border-dotted" />
      <div className="relative top-4">
        <ProgressPoint text="邀請碼輸入" />
      </div>
      <div className="relative top-4">
        <ProgressPoint text="球員資料" />
      </div>
      <div className="relative top-4">
        <ProgressPoint text="參戰宣言" />
      </div>
    </div>
  )
}
