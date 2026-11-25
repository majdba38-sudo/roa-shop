export function formatPrice(value, lang = 'ar') {
  const n = Number(value) || 0
  const formatted = n.toLocaleString('en-US')
  return lang === 'ar' ? `${formatted} ر.س` : `SAR ${formatted}`
}

export function productName(product, lang = 'ar') {
  return lang === 'ar' ? product.nameAr : product.nameEn
}

export function productDesc(product, lang = 'ar') {
  return lang === 'ar' ? product.descAr : product.descEn
}

export function productTag(product, lang = 'ar') {
  return lang === 'ar' ? product.tagAr : product.tagEn
}

export function productInspired(product, lang = 'ar') {
  return lang === 'ar' ? product.inspiredAr : product.inspiredEn
}

export function itemsLabel(count, lang = 'ar') {
  if (lang === 'ar') {
    if (count === 0) return 'لا منتجات'
    if (count === 1) return 'منتج واحد'
    if (count === 2) return 'منتجان'
    if (count <= 10) return `${count} منتجات`
    return `${count} منتجاً`
  }
  return `${count} ${count === 1 ? 'item' : 'items'}`
}

export function orderRef() {
  const n = Math.floor(1000 + Math.random() * 9000)
  return `ROA-${n}`
}
