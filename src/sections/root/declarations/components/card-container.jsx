import { CACHE_KEY } from '@/constants/cache-key'
import { URL } from '@/constants/url'
import { VERSION } from '@/constants/version'

import CardList from './card-list'

const getUserBattleDeclarations = async () => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/list/getBattleDeclarationList`,
      {
        next: {
          revalidate: 60 * 5,
          tags: [CACHE_KEY.BATTLE_DECLARATIONS],
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch battle declarations')
    }

    const data = await res.json()
    return data.data
  } catch (error) {
    console.error('>>> [getBattleDeclarations] error: ', error)
    return []
  }
}

const getDeclarationsOptions = async () => {
  try {
    const url = `${URL.BattleListCDN}${VERSION.BattleListCDN}/DeclarationsList.json`

    const res = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24,
        tags: [CACHE_KEY.DECLARATIONS_OPTIONS],
      },
    })

    const data = await res.json()
    return data
  } catch (error) {
    console.error('>>> [getDeclarationsOptions] error: ', error)
    return []
  }
}

async function CardContainer() {
  const battleDeclarations = await getUserBattleDeclarations()
  const declarationsOptions = await getDeclarationsOptions()

  return (
    <CardList
      battleDeclarations={battleDeclarations}
      declarationsOptions={declarationsOptions}
    />
  )
}

export default CardContainer
