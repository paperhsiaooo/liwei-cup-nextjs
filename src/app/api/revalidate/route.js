import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { tags } = body

    if (tags.length === 0) {
      return NextResponse.json({ error: '缺少 tags 參數' }, { status: 400 })
    }

    tags.forEach(tag => {
      revalidateTag(tag)
    })

    return NextResponse.json(
      { message: `成功重新驗證 ${tags.length} 個 tag`, tags },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to revalidate products', error: error },
      { status: 500 },
    )
  }
}
