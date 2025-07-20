import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export default function UserForm({ user }) {
  console.log('[user-form] user:', user)

  return (
    <div className="root">
      <div className="wrapper py-4 flex flex-col gap-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">歡迎光臨 {user.name}</h1>
          <p className="text-sm text-gray-500">以下有些資訊請你選擇</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* 暱稱 */}
          <div className="flex flex-row items-center gap-2">
            <h4 className="scroll-m-20 text-base tracking-tight">暱稱</h4>
            <Input className="flex-1" />
          </div>

          {/* 衣服尺寸 */}
          <div className="flex items-center gap-2">
            <h4 className="scroll-m-20 text-base tracking-tight">衣服尺寸</h4>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 是否參戰 */}
          <div className="flex items-center gap-2">
            <h4 className="scroll-m-20 text-base tracking-tight">是否參戰</h4>
            <Checkbox />
          </div>

          {/* 對戰宣言 */}
          <div className="flex flex-row items-center gap-2">
            <h4 className="scroll-m-20 text-base tracking-tight">對戰宣言</h4>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 想對主辦單位說的話 */}
          <div className="flex items-center gap-2">
            <Textarea placeholder="想對主辦單位說的話" />
          </div>
        </div>
      </div>
    </div>
  )
}
