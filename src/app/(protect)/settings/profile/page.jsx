import Link from 'next/link'

import { cn } from '@/lib/utils'
import { MemberProfileCard } from '@/sections/profile/member-profile'

export const metadata = {
  title: '會員中心',
}

const SETTINGS_TABS = [
  {
    label: 'Profile',
    href: '/settings/profile',
  },
  {
    label: 'Orders',
    href: '/settings/orders',
  },
]

export default function ProfileSettingsPage() {
  return (
    <main className="bg-[#F9F9F9]">
      <div className="wrapper py-10 lg:py-16">
        <div className="flex flex-col gap-8">
          <SettingsTabs activePath="/settings/profile" />
          <MemberProfileCard />
        </div>
      </div>
    </main>
  )
}

function SettingsTabs({ activePath }) {
  return (
    <nav className="w-full overflow-x-auto">
      <div className="flex min-w-max items-center gap-2 rounded-[32px] border border-blue-primary/10 bg-white px-4 py-2 shadow-[0_12px_32px_rgba(35,49,69,0.08)]">
        {SETTINGS_TABS.map(tab => {
          const isActive = tab.href === activePath

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'inline-flex items-center justify-center rounded-[20px] px-4 py-2 text-sm font-semibold text-blue-primary/60 transition-colors duration-200 md:px-5 md:text-base',
                isActive
                  ? 'bg-blue-primary text-white shadow-[0_12px_24px_rgba(35,49,69,0.18)]'
                  : 'hover:text-blue-primary',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
