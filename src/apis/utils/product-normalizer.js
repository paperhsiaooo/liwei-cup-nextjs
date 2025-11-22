import { toArray, uniqueList } from '@/utils/array'
import { extractImageUrl } from '@/utils/image'

const toDisplayString = value => {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return (
      value.display_value ??
      value.displayValue ??
      value.label ??
      value.name ??
      value.value ??
      null
    )
  }
  return null
}

const toValueString = value => {
  if (!value) return null
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    return value.value ?? value.code ?? value.id ?? null
  }
  return null
}

const toNumeric = value => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }
  if (typeof value === 'string') {
    const parsed = Number(value.trim())
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }
  return null
}

const resolveImageList = source =>
  toArray(source).map(extractImageUrl).filter(Boolean)

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

  let colorDisplay = null
  if (typeof sku.color === 'string') {
    colorDisplay = sku.color
  } else {
    colorDisplay = toDisplayString(sku.color) ?? toDisplayString(sku.colorName)
  }

  let sizeDisplay = null
  if (typeof sku.size === 'string') {
    sizeDisplay = sku.size
  } else {
    sizeDisplay = toDisplayString(sku.size) ?? toDisplayString(sku.sizeName)
  }

  let colorValue = null
  if (typeof sku.colorValue === 'string') {
    colorValue = sku.colorValue
  } else {
    colorValue = toValueString(sku.color) ?? toValueString(sku.colorCode)
  }

  let sizeValue = null
  if (typeof sku.sizeValue === 'string') {
    sizeValue = sku.sizeValue
  } else {
    sizeValue = toValueString(sku.size) ?? toValueString(sku.sizeCode)
  }

  const variantImages = resolveImageList(sku.images)

  const parsedInventory =
    typeof sku.inventory === 'number'
      ? sku.inventory
      : typeof sku.inventory === 'string'
        ? Number.parseInt(sku.inventory, 10) || null
        : typeof sku.variantInventory === 'number'
          ? sku.variantInventory
          : null

  const resolvedVariantId =
    toNumeric(sku.variantId) ??
    toNumeric(sku.variant_id) ??
    toNumeric(sku.id) ??
    toNumeric(sku.skuId) ??
    toNumeric(sku.sku_id)

  const skuPrimary =
    resolvedVariantId ??
    sku?.sku_code ??
    sku?.skuCode ??
    sku?.skuId ??
    sku?.sku_id ??
    null
  const normalizedSkuId =
    typeof skuPrimary === 'number'
      ? String(skuPrimary)
      : skuPrimary
        ? `${skuPrimary}`
        : null

  const resolvedPrice =
    typeof sku?.price === 'number'
      ? sku.price
      : typeof sku?.price === 'string'
        ? Number.parseFloat(sku.price)
        : typeof sku?.amount === 'number'
          ? sku.amount
          : null

  return {
    skuId: normalizedSkuId ?? undefined,
    variantId: resolvedVariantId ?? null,
    productId:
      toNumeric(sku.productId) ?? toNumeric(sku.product_id) ?? undefined,
    skuCode: sku?.sku_code ?? sku?.skuCode ?? null,
    price: resolvedPrice,
    inventory: parsedInventory,
    color: colorDisplay ?? null,
    colorValue: colorValue ?? null,
    size: sizeDisplay ?? null,
    sizeValue: sizeValue ?? null,
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

  const imageSources =
    rawDetail.images &&
    Array.isArray(rawDetail.images) &&
    rawDetail.images.length
      ? rawDetail.images
      : rawDetail.gallery
  const imageList = resolveImageList(imageSources)
  const mainImage =
    rawDetail.mainImage ?? rawDetail.main_image ?? imageList[0] ?? null
  const fallbackImages =
    imageList.length > 0 ? imageList : mainImage ? [mainImage] : []

  const rawVariantsSource =
    rawDetail.variants && Array.isArray(rawDetail.variants)
      ? rawDetail.variants
      : rawDetail.skus
  const rawVariants = toArray(rawVariantsSource)
  const variants = rawVariants
    .map(sku => normalizeProductVariant(sku, fallbackImages))
    .filter(Boolean)

  const payloadColors = uniqueList(
    toArray(rawDetail.colors).map(color => {
      if (typeof color === 'string') {
        return color
      }
      if (typeof color === 'object') {
        return color.name ?? color.label ?? color.displayValue ?? null
      }
      return null
    }),
  )
  const colors =
    payloadColors.length > 0
      ? payloadColors
      : uniqueList(variants.map(variant => variant.color))

  const payloadSizes = uniqueList(
    toArray(rawDetail.sizes).map(size => {
      if (typeof size === 'string') {
        return size
      }
      if (typeof size === 'object') {
        return size.name ?? size.label ?? size.displayValue ?? null
      }
      return null
    }),
  )
  const sizes =
    payloadSizes.length > 0
      ? payloadSizes
      : uniqueList(variants.map(variant => variant.size))

  const tags = uniqueList(
    toArray(rawDetail.tags).map(tag => tag?.name ?? tag?.label ?? null),
  )

  const resolvedPrice =
    typeof rawDetail.price === 'number'
      ? rawDetail.price
      : typeof rawDetail.price === 'string'
        ? Number.parseFloat(rawDetail.price)
        : undefined

  const basePrice =
    typeof rawDetail.base_price === 'number'
      ? rawDetail.base_price
      : typeof rawDetail.basePrice === 'number'
        ? rawDetail.basePrice
        : typeof resolvedPrice === 'number'
          ? resolvedPrice
          : null

  const fallbackVariantPrice =
    variants.find(variant => typeof variant.price === 'number')?.price ?? null

  const price =
    typeof resolvedPrice === 'number'
      ? resolvedPrice
      : (basePrice ?? fallbackVariantPrice)

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
    price,
    basePrice,
    tag: tags[0],
    tags,
    colors,
    sizes,
    images: fallbackImages,
    gallery: fallbackImages,
    heroImage: mainImage,
    mainImage,
    variants,
    rawVariants,
    rawSkus: rawVariants,
    inventoryTotal: totalInventory,
    snapshot: rawDetail.snapshot ?? null,
    createdAt: rawDetail.created_at ?? rawDetail.createdAt ?? null,
    updatedAt: rawDetail.updated_at ?? rawDetail.updatedAt ?? null,
    raw: rawDetail,
  }
}
