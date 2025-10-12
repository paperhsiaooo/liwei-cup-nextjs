const MOCK_PRODUCTS = [
  {
    productId: 'volleyball-socks-classic-se',
    name: 'Volleyball Socks Classic+ SE',
    tagline: '回到球場，揮灑汗水的最好夥伴',
    description:
      '採用吸濕排汗纖維與加強足弓支撐，提供長時間的穩定包覆與舒適腳感。力維盃限定配色，收藏與實戰皆適用。',
    price: 150,
    tag: 'LIMITED',
    colors: ['2025藍', '2025麻米', '2025灰黑'],
    sizes: ['M (20-24.5cm)', 'L (25-29cm)'],
    heroImage: 'https://picsum.photos/seed/volley-main/1100/1100',
    images: [
      'https://picsum.photos/seed/volley-main/1100/1100',
      'https://picsum.photos/seed/volley-side/800/800',
      'https://picsum.photos/seed/volley-detail/800/800',
      'https://picsum.photos/seed/volley-pack/800/800',
    ],
  },
  {
    productId: 'training-tee-elite',
    name: 'Training Tee Elite',
    tagline: '輕量速乾，任你揮汗',
    description:
      '採用高透氣網布與抗菌纖維，確保長時間訓練依舊乾爽清新。胸前壓印 2025 力維盃 Logo，限量發售。',
    price: 480,
    tag: 'NEW',
    colors: ['午夜藍', '象牙白'],
    sizes: ['S', 'M', 'L', 'XL'],
    heroImage: 'https://picsum.photos/seed/tee-main/1100/1100',
    images: [
      'https://picsum.photos/seed/tee-main/1100/1100',
      'https://picsum.photos/seed/tee-back/800/800',
      'https://picsum.photos/seed/tee-detail/800/800',
      'https://picsum.photos/seed/tee-fold/800/800',
    ],
  },
  {
    productId: 'power-grip-gloves',
    name: 'Power Grip Gloves',
    tagline: '穩定握力，全面掌控',
    description:
      '掌心蜂巢止滑設計與透氣網布手背組合，維持抓握力道又能有效排汗，適合訓練與日常運動使用。',
    price: 320,
    tag: 'HOT',
    colors: ['黑曜石', '晨霧灰'],
    sizes: ['S', 'M', 'L'],
    heroImage: 'https://picsum.photos/seed/glove-main/1100/1100',
    images: [
      'https://picsum.photos/seed/glove-main/1100/1100',
      'https://picsum.photos/seed/glove-back/800/800',
      'https://picsum.photos/seed/glove-detail/800/800',
      'https://picsum.photos/seed/glove-pack/800/800',
    ],
  },
  {
    productId: 'stadium-duffel-pro',
    name: 'Stadium Duffel Pro',
    tagline: '裝載所有戰力的專業球袋',
    description:
      '防潑水外層與多樣收納隔層設計，可放置鞋款、球衣與個人物品。附贈力維盃紀念吊飾，出征必備。',
    price: 1280,
    tag: 'BEST SELLER',
    colors: ['石墨黑'],
    sizes: ['35L'],
    heroImage: 'https://picsum.photos/seed/duffel-main/1100/1100',
    images: [
      'https://picsum.photos/seed/duffel-main/1100/1100',
      'https://picsum.photos/seed/duffel-side/800/800',
      'https://picsum.photos/seed/duffel-detail/800/800',
      'https://picsum.photos/seed/duffel-pack/800/800',
    ],
  },
]

const getMockProduct = productId => {
  if (!productId) return MOCK_PRODUCTS[0] ?? null
  const matched = MOCK_PRODUCTS.find(item => item.productId === productId)

  if (matched) return matched

  if (MOCK_PRODUCTS.length > 0) {
    return { ...MOCK_PRODUCTS[0], productId }
  }

  return null
}

const getMockProductList = () => MOCK_PRODUCTS

export { getMockProduct, getMockProductList, MOCK_PRODUCTS }
