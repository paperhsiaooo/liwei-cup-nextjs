'use client'

import {
  AlertTriangle,
  CalendarDays,
  Mail,
  PhoneCall,
  UserRound,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const profileSnapshot = {
  name: '蕭力維',
  email: 'paper.hsiao@gmail.com',
  isEmailVerified: false,
  mobile: {
    code: 'tw',
    number: '0912 345 678',
  },
  gender: 'male',
  birthday: {
    year: String(new Date().getFullYear() - 5),
    month: '08',
    day: '15',
  },
}

const COUNTRY_CODES = [
  { value: 'tw', label: 'TW +886' },
  { value: 'jp', label: 'JP +81' },
  { value: 'us', label: 'US +1' },
  { value: 'sg', label: 'SG +65' },
]

const GENDERS = [
  { value: 'male', label: '男性 Male' },
  { value: 'female', label: '女性 Female' },
  { value: 'non-binary', label: '其他 / 不透露' },
]

const currentYear = new Date().getFullYear()
const YEARS = Array.from({ length: 70 }, (_, index) =>
  String(currentYear - index),
)
const MONTHS = Array.from({ length: 12 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
)
const DAYS = Array.from({ length: 31 }, (_, index) =>
  String(index + 1).padStart(2, '0'),
)

function Label({ className, htmlFor, children, optional = false }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn('text-sm font-semibold text-blue-primary', className)}
    >
      {children}
      {optional ? (
        <span className="ml-2 text-xs font-normal text-blue-primary/60">
          (選填)
        </span>
      ) : null}
    </label>
  )
}

export function MemberProfileCard() {
  return (
    <section className="rounded-[28px] border border-blue-primary/10 bg-white px-6 py-6 shadow-[0_30px_70px_rgba(35,49,69,0.08)] sm:px-8 sm:py-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-primary text-white shadow-[0_16px_28px_rgba(35,49,69,0.25)]">
            <UserRound className="size-6" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-primary/50">
              Member center
            </p>
            <h2 className="text-2xl font-bold text-blue-primary">
              Member profile
            </h2>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-blue-primary">
          <CalendarDays className="size-4" />
          保持資料最新
        </span>
      </header>
      <form className="mt-8 space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="profile-name">Name</Label>
            <Input
              id="profile-name"
              name="name"
              defaultValue={profileSnapshot.name}
              className="h-11 rounded-xl border-blue-primary/20 bg-blue-primary/5 text-blue-primary placeholder:text-blue-primary/40"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="profile-email">Email Address</Label>
            <Input
              id="profile-email"
              type="email"
              defaultValue={profileSnapshot.email}
              aria-invalid={!profileSnapshot.isEmailVerified}
              className="h-11 rounded-xl border-blue-primary/20 bg-blue-primary/5 text-blue-primary placeholder:text-blue-primary/40"
            />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-orange-primary">
                <AlertTriangle className="size-4" />
                <span>尚未驗證</span>
              </div>
              <Button
                type="button"
                className="h-11 w-full justify-center rounded-xl bg-green-primary text-blue-primary font-semibold hover:bg-green-primary/90 sm:w-auto"
              >
                Send Verification Email
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="profile-mobile">Mobile number</Label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,0.55fr)_1fr]">
            <Select defaultValue={profileSnapshot.mobile.code}>
              <SelectTrigger
                id="profile-mobile-code"
                className="h-11 w-full rounded-xl border-blue-primary/20 bg-white text-blue-primary"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COUNTRY_CODES.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              id="profile-mobile"
              type="tel"
              defaultValue={profileSnapshot.mobile.number}
              className="h-11 rounded-xl border-blue-primary/20 bg-blue-primary/5 text-blue-primary placeholder:text-blue-primary/40"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            disabled
            className="h-11 w-full justify-center rounded-xl border-blue-primary/20 text-blue-primary/60"
          >
            Send me check code
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="profile-gender">Gender</Label>
            <Select defaultValue={profileSnapshot.gender}>
              <SelectTrigger
                id="profile-gender"
                className="h-11 w-full rounded-xl border-blue-primary/20 bg-white text-blue-primary"
              >
                <SelectValue placeholder="Choose" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <Label optional>Birthday</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Select defaultValue={profileSnapshot.birthday.year}>
                <SelectTrigger className="h-11 w-full rounded-xl border-blue-primary/20 bg-white text-blue-primary">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {YEARS.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={profileSnapshot.birthday.month}>
                <SelectTrigger className="h-11 w-full rounded-xl border-blue-primary/20 bg-white text-blue-primary">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {MONTHS.map(month => (
                    <SelectItem key={month} value={month}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue={profileSnapshot.birthday.day}>
                <SelectTrigger className="h-11 w-full rounded-xl border-blue-primary/20 bg-white text-blue-primary">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  {DAYS.map(day => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="flex items-center gap-2 text-xs text-blue-primary/60">
              <CalendarDays className="size-4" />
              填寫生日即可在活動檔期收到專屬驚喜。
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <Label htmlFor="profile-password">Password</Label>
            <Button
              type="button"
              variant="ghost"
              className="h-11 w-full justify-between rounded-xl border border-blue-primary/10 bg-white px-4 text-blue-primary hover:bg-blue-primary/5"
            >
              <span>Set new password</span>
              <Mail className="size-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <Label htmlFor="profile-third-party">Third-Party Account</Label>
            <div className="flex items-center justify-between rounded-xl border border-blue-primary/10 bg-blue-primary/5 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-full bg-blue-primary text-white">
                  <PhoneCall className="size-4" />
                </div>
                <div className="text-sm text-blue-primary">
                  <p className="font-semibold">Paper</p>
                  <p className="text-blue-primary/60">已綁定 LINE 帳號</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                className="hidden text-sm font-semibold text-blue-primary hover:bg-transparent sm:inline-flex"
              >
                管理
              </Button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}
