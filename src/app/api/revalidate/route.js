import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const token = request.headers.get('x-revalidate-token')
  if (!token || token !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { tags } = body ?? {}

    if (!Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: '缺少或無效的 tags 參數' },
        { status: 400 },
      )
    }

    const invalid = tags.some(
      tag => typeof tag !== 'string' || tag.length === 0,
    )
    if (invalid) {
      return NextResponse.json(
        { error: 'tags 需為非空字串陣列' },
        { status: 400 },
      )
    }

    tags.forEach(tag => revalidateTag(tag))

    return NextResponse.json(
      { message: `成功重新驗證 ${tags.length} 個 tag`, tags },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to revalidate tags' },
      { status: 500 },
    )
  }
}
