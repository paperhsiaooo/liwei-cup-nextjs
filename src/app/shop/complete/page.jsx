import Image from 'next/image'
import Link from 'next/link'

import ClientOnlyView from '@/components/common/client-only/client-only-view'
import ConfettiRunner from '@/components/confetti-runner'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: '兌換成功',
  description:
    '恭喜您成功兌換 2025 力維盃錦標賽商品！訂單處理中，我們將盡快為您出貨。',
  robots: {
    index: false,
    follow: false,
  },
}

function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[96px_1fr] gap-2 text-sm leading-6">
      <div className="text-gray-primary/90">{label}</div>
      <div className="text-blue-primary font-medium break-all">{value}</div>
    </div>
  )
}

function CompletePage() {
  // TODO: 實際串接訂單完成資訊，可以 searchParams 或 API 取得
  const mock = {
    product: {
      title: 'G2000 PRO 2.0 電競遊戲喇叭',
      qty: 12,
      point: 8200,
      image: '/images/picture/08.jpg',
      total: 98400,
    },
    order: {
      id: 'ORD202401001',
      ship: '宅配到府',
      eta: '2025-07-28 23:59:59 前',
      name: '王明明',
      phone: '09XXXXXXX',
      note: '404台中市西屯區安東東路3號2樓',
    },
  }

  return (
    <div className="wrapper py-8 md:py-12">
      <ClientOnlyView>
        <ConfettiRunner />
      </ClientOnlyView>

      <div className="mx-auto max-w-[960px]">
        <div className="relative mb-6 flex items-center justify-center">
          <Image
            src="/images/win-01.png"
            alt="win"
            width={120}
            height={120}
            priority
            className="pointer-events-none select-none"
          />
        </div>

        <h1 className="progress-title mb-2">兌換成功</h1>

        <div className="rounded-2xl bg-white p-5 md:p-8 shadow-sm border border-border/60">
          <div className="mb-6 border-b pb-4">
            <div className="text-[#B14A2A] text-xl font-antonio tracking-wide mb-3">
              實體好禮
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4 md:grid-cols-[160px_1fr] md:gap-6 items-center">
              <div className="overflow-hidden rounded-xl border">
                <Image
                  src={mock.product.image}
                  alt={mock.product.title}
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-blue-primary text-[18px] md:text-[20px] font-bold">
                  {mock.product.title}
                </div>
                <div className="text-sm text-gray-primary/90">
                  數量：x{mock.product.qty}
                </div>
                <div className="text-sm text-gray-primary/90">
                  點數：{mock.product.point.toLocaleString()}
                </div>
                <div className="pt-1 text-[15px] font-bold text-[#B14A2A]">
                  消耗總點數：
                  <span className="ml-1 inline-flex items-center gap-1">
                    <Image
                      src="/window.svg"
                      alt="coin"
                      width={18}
                      height={18}
                    />
                    {mock.product.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 rounded-xl bg-[#FFF7F2] p-4 md:p-6 border border-[#F3E1D7]">
              <InfoRow label="訂單編號" value={mock.order.id} />
              <InfoRow label="運送方式" value={mock.order.ship} />
              <InfoRow label="預計出貨前" value={mock.order.eta} />
              <InfoRow label="收件人姓名" value={mock.order.name} />
              <InfoRow label="收件人手機" value={mock.order.phone} />
              <InfoRow label="常設地址" value={mock.order.note} />
            </div>

            <div className="space-y-2 rounded-xl bg-[#FFF7F2] p-4 md:p-6 border border-[#F3E1D7]">
              <div className="text-[13px] leading-6 text-gray-600">
                請務必閱讀商品說明內，並確認訂單資訊。
                商品顯示內容以各專賣頁商品說明裡面的注意事項與商品內容說明為準。
                明細資訊將會與商品寄送時一併附上。
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 md:flex-row md:justify-end">
            <Link href="/products" className="w-full md:w-auto">
              <Button className="w-full">繼續兌換其他商品</Button>
            </Link>
            <Link href="/" className="w-full md:w-auto">
              <Button variant="outline" className="w-full">
                回首頁
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompletePage
