import ClientOnlyView from '@/components/common/client-only/client-only-view'
import ConfettiView from '@/components/confetti-view'
import { Address } from '@/sections/root/address'
import { Declaration } from '@/sections/root/declarations'
import { InviteCard } from '@/sections/root/inviteCard'
import { Main } from '@/sections/root/main'
import { Qa } from '@/sections/root/qa'

export default function Root() {
  return (
    <main className="relative overflow-hidden">
      <div className="fixed z-50 top-0 left-0 w-full h-full pointer-events-none">
        <ClientOnlyView>
          <ConfettiView />
        </ClientOnlyView>
      </div>
      <Main />
      <Address />
      <Declaration />
      <InviteCard />
      <Qa />
    </main>
  )
}
