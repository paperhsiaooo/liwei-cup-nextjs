import { toArray, uniqueList } from '@/utils/array'
import { extractImageUrl } from '@/utils/image'

/**
 * 正規化商品列表項目
 * @param {object} rawProduct - 原始商品資料
 * @returns {object} 正規化後的商品資料
 */
export const normalizeProduct = rawProduct => {
  if (!rawProduct || typeof rawProduct !== 'object') {
    return {
      productId: '',
      name: '',
      description: '',
      price: null,
      images: [],
    }
  }

  const id = rawProduct.productId ?? rawProduct.id ?? ''
  const normalizedId = typeof id === 'number' ? String(id) : id

  const price = rawProduct.price ?? rawProduct.base_price ?? null

  const images =
    Array.isArray(rawProduct.images) && rawProduct.images.length > 0
      ? rawProduct.images
      : rawProduct.main_image
        ? [rawProduct.main_image]
        : []

  return {
    ...rawProduct,
    productId: normalizedId,
    price,
    images,
  }
}

/**
 * 正規化商品變體（SKU）
 * @param {object} sku - SKU 資料
 * @param {Array<string>} fallbackImages - 備用圖片陣列
 * @returns {object|null} 正規化後的 SKU 資料
 */
export const normalizeProductVariant = (sku, fallbackImages) => {
  if (!sku || typeof sku !== 'object') {
    return null
  }

  const colorAttr = sku.color ?? null
  const sizeAttr = sku.size ?? null

  const colorDisplay =
    colorAttr?.display_value ??
    colorAttr?.displayValue ??
    colorAttr?.label ??
    colorAttr?.value ??
    null
  const sizeDisplay =
    sizeAttr?.display_value ??
    sizeAttr?.displayValue ??
    sizeAttr?.label ??
    sizeAttr?.value ??
    null

  const variantImages = toArray(sku.images).map(extractImageUrl).filter(Boolean)

  const parsedInventory =
    typeof sku.inventory === 'number'
      ? sku.inventory
      : typeof sku.inventory === 'string'
        ? Number.parseInt(sku.inventory, 10) || null
        : null

  const skuPrimary =
    sku?.sku_code ?? sku?.skuCode ?? sku?.id ?? sku?.skuId ?? null
  const normalizedSkuId =
    typeof skuPrimary === 'number'
      ? String(skuPrimary)
      : skuPrimary
        ? `${skuPrimary}`
        : null

  return {
    skuId: normalizedSkuId ?? undefined,
    skuCode: sku?.sku_code ?? sku?.skuCode ?? null,
    price:
      typeof sku?.price === 'number'
        ? sku.price
        : typeof sku?.price === 'string'
          ? Number.parseFloat(sku.price)
          : null,
    inventory: parsedInventory,
    color: colorDisplay ?? null,
    colorValue: colorAttr?.value ?? colorAttr?.code ?? null,
    size: sizeDisplay ?? null,
    sizeValue: sizeAttr?.value ?? null,
    images: variantImages.length > 0 ? variantImages : fallbackImages,
    snapshot: sku?.snapshot ?? null,
    raw: sku,
  }
}

/**
 * 正規化商品詳情
 * @param {object} rawDetail - 原始商品詳情資料
 * @returns {object|null} 正規化後的商品詳情資料
 */
export const normalizeProductDetail = rawDetail => {
  if (!rawDetail || typeof rawDetail !== 'object') {
    return null
  }

  const rawId = rawDetail.productId ?? rawDetail.id ?? ''
  const productId =
    typeof rawId === 'number' ? String(rawId) : rawId ? `${rawId}` : ''

  const galleryItems = toArray(rawDetail.gallery)
  const galleryImages = galleryItems.map(extractImageUrl).filter(Boolean)
  const mainImage =
    rawDetail.main_image ?? rawDetail.mainImage ?? galleryImages[0] ?? null
  const fallbackImages =
    galleryImages.length > 0 ? galleryImages : mainImage ? [mainImage] : []

  const rawSkus = toArray(rawDetail.skus)
  const variants = rawSkus
    .map(sku => normalizeProductVariant(sku, fallbackImages))
    .filter(Boolean)

  const colors = uniqueList(variants.map(variant => variant.color))
  const sizes = uniqueList(variants.map(variant => variant.size))
  const tags = uniqueList(
    toArray(rawDetail.tags).map(tag => tag?.name ?? tag?.label ?? null),
  )

  const basePrice =
    typeof rawDetail.base_price === 'number'
      ? rawDetail.base_price
      : typeof rawDetail.basePrice === 'number'
        ? rawDetail.basePrice
        : null
  const resolvedPrice =
    basePrice ??
    variants.find(variant => typeof variant.price === 'number')?.price ??
    null

  const totalInventory = variants.reduce((total, variant) => {
    if (
      typeof variant.inventory === 'number' &&
      !Number.isNaN(variant.inventory)
    ) {
      return total + variant.inventory
    }
    return total
  }, 0)

  return {
    productId,
    id: productId,
    name: rawDetail.name ?? '',
    description: rawDetail.description ?? '',
    price: resolvedPrice,
    basePrice: basePrice ?? resolvedPrice,
    tag: tags[0],
    tags,
    colors,
    sizes,
    images: fallbackImages,
    gallery: fallbackImages,
    heroImage: mainImage,
    mainImage,
    variants,
    rawSkus,
    inventoryTotal: totalInventory,
    snapshot: rawDetail.snapshot ?? null,
    createdAt: rawDetail.created_at ?? rawDetail.createdAt ?? null,
    updatedAt: rawDetail.updated_at ?? rawDetail.updatedAt ?? null,
    raw: rawDetail,
  }
}
