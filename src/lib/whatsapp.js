import { site } from '../data/site'
import { formatPrice, productName } from './format'

export function normalizePhone(value) {
  return String(value || '').replace(/[\s\-().]/g, '')
}

export function isValidSaudiPhone(value) {
  const phone = normalizePhone(value)
  return /^(?:\+?9665|009665|05|5)\d{8}$/.test(phone)
}

export function toInternationalSaudiPhone(value) {
  const phone = normalizePhone(value)
  if (!isValidSaudiPhone(phone)) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('009665')) return `966${digits.slice(6)}`
  if (digits.startsWith('9665')) return `966${digits.slice(3)}`
  if (digits.startsWith('05')) return `966${digits.slice(1)}`
  if (digits.startsWith('5')) return `966${digits}`
  return digits
}

export function buildOrderMessage({ orderNumber, items, subtotal, customer, lang = 'ar' }) {
  const isAr = lang === 'ar'
  const lines = []
  const total = formatPrice(subtotal, lang)

  if (isAr) {
    lines.push('🌿 *طلب جديد — رؤى الطبيعة | ROA NATURE*')
    lines.push(`رقم الطلب: *${orderNumber}*`)
    lines.push('')
    lines.push('*المنتجات*')
    items.forEach(({ product, qty }) => {
      lines.push(
        `• ${product.nameAr} (${product.nameEn}) × ${qty} — ${formatPrice(product.price * qty, 'ar')}`,
      )
    })
    lines.push('')
    lines.push(`*المجموع الفرعي:* ${total}`)
    lines.push(`*الإجمالي:* ${total}`)
    lines.push('')
    lines.push('*بيانات التوصيل*')
    lines.push(`الاسم: ${customer.fullName}`)
    lines.push(`الجوال: ${customer.mobile}`)
    lines.push(`المدينة: ${customer.city}`)
    lines.push(`الحي: ${customer.district}`)
    lines.push(`العنوان: ${customer.address}`)
    if (customer.notes?.trim()) lines.push(`ملاحظات: ${customer.notes.trim()}`)
    lines.push('')
    lines.push('سيتم تأكيد تفاصيل الطلب والتوصيل عبر واتساب.')
    lines.push('— أُرسل من موقع رؤى الطبيعة')
  } else {
    lines.push('🌿 *New order — ROA NATURE*')
    lines.push(`Order: *${orderNumber}*`)
    lines.push('')
    lines.push('*Items*')
    items.forEach(({ product, qty }) => {
      lines.push(`• ${product.nameEn} × ${qty} — ${formatPrice(product.price * qty, 'en')}`)
    })
    lines.push('')
    lines.push(`*Subtotal:* ${total}`)
    lines.push(`*Total:* ${total}`)
    lines.push('')
    lines.push('*Delivery details*')
    lines.push(`Name: ${customer.fullName}`)
    lines.push(`Mobile: ${customer.mobile}`)
    lines.push(`City: ${customer.city}`)
    lines.push(`District: ${customer.district}`)
    lines.push(`Address: ${customer.address}`)
    if (customer.notes?.trim()) lines.push(`Notes: ${customer.notes.trim()}`)
    lines.push('')
    lines.push('Order and delivery details will be confirmed on WhatsApp.')
    lines.push('— Sent from the ROA NATURE website')
  }

  return lines.join('\n')
}

export function buildWhatsAppUrl(message) {
  const number = site.whatsappNumber
  if (!number) return ''
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function contactWhatsAppUrl(lang = 'ar') {
  const message =
    lang === 'ar'
      ? 'مرحباً رؤى الطبيعة 🌿\nأود الاستفسار عن منتجاتكم.'
      : 'Hello ROA NATURE 🌿\nI would like to ask about your products.'
  return buildWhatsAppUrl(message)
}
