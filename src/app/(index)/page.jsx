import { Address } from '@/sections/root/address'
import { Declaration } from '@/sections/root/declarations'
import { InviteCard } from '@/sections/root/inviteCard'
import { Main } from '@/sections/root/main'
import { Qa } from '@/sections/root/qa'

export default function Root() {
  return (
    <main className="overflow-hidden">
      <Main />
      <Address />
      <Declaration />
      <InviteCard />
      <Qa />
    </main>
  )
}
