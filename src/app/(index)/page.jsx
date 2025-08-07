import { Address } from '@/sections/root/address'
import { InviteCard } from '@/sections/root/inviteCard'
import { Main } from '@/sections/root/main'
import { Qa } from '@/sections/root/qa'

export default function Root() {
  return (
    <div className="overflow-hidden">
      <Main />
      <Address />
      <InviteCard />
      <Qa />
    </div>
  )
}
