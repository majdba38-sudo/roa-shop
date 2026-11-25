/**
 * Site-wide editable settings.
 * Replace the placeholder phone, social links and brand assets here.
 */
export const site = {
  nameAr: 'رؤى الطبيعة',
  nameEn: 'ROA NATURE',
  taglineAr: 'اكتشف جمال الطبيعة.',
  taglineEn: 'Discover the Beauty of Nature.',
  // Editable placeholder contact number (local Saudi format).
  phoneLocal: '0512345678',
  // Optional; leave empty to hide.
  email: '',
  // Official ROA NATURE logo files (prepared from the supplied brand artwork).
  assets: {
    fullLogo: './brand/logo-full.webp',
    fullLogoLight: './brand/logo-full-light.webp',
    mark: './brand/logo-mark.webp',
  },
  social: [
    { id: 'instagram', label: 'Instagram', href: '#', handle: '@roanature' },
    { id: 'tiktok', label: 'TikTok', href: '#', handle: '@roanature' },
    { id: 'x', label: 'X', href: '#', handle: '@roanature' },
  ],
  /** Converts 0512345678 → 966512345678 when valid. */
  get whatsappNumber() {
    const digits = String(this.phoneLocal || '').replace(/\D/g, '')
    if (digits.startsWith('966') && digits.length === 12) return digits
    if (digits.startsWith('05') && digits.length === 10) return `966${digits.slice(1)}`
    if (digits.startsWith('5') && digits.length === 9) return `966${digits}`
    return digits
  },
}
