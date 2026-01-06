export const metadata = {
  title: '個人資料 | 2025 力維盃排球錦標賽',
  description: '管理您的力維盃帳號個人資料',
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto min-h-screen p-8">
      <div className="rounded-lg border-8 border-blue-primary bg-white p-6 shadow-md">
        <h1 className="mb-4 font-anton text-3xl font-black text-blue-primary">
          個人資料
        </h1>
        <p className="text-gray-600">此頁面將顯示您的個人資訊和帳戶設定</p>
      </div>
    </div>
  )
}
