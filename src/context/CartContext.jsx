import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productById } from '../data/products'
import { safeRead, safeWrite } from '../lib/storage'

const CartContext = createContext(null)
const STORAGE_KEY = 'roa-nature-cart-v1'
const MAX_QTY = 99

function sanitizeItems(value) {
  if (!Array.isArray(value)) return []
  const merged = new Map()
  value.forEach((entry) => {
    const id = entry?.id
    const qty = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(entry?.qty) || 0)))
    if (!productById(id) || qty < 1) return
    merged.set(id, Math.min(MAX_QTY, (merged.get(id) || 0) + qty))
  })
  return Array.from(merged, ([id, qty]) => ({ id, qty }))
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => sanitizeItems(safeRead(STORAGE_KEY, [])))
  const [isCartOpen, setCartOpen] = useState(false)
  const [isCheckoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    safeWrite(STORAGE_KEY, items)
  }, [items])

  const addItem = useCallback((id, qty = 1) => {
    if (!productById(id)) return
    const amount = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(qty) || 1)))
    setItems((current) => {
      const existing = current.find((item) => item.id === id)
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, qty: Math.min(MAX_QTY, item.qty + amount) } : item,
        )
      }
      return [...current, { id, qty: amount }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    const next = Math.min(MAX_QTY, Math.max(1, Math.floor(Number(qty) || 1)))
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty: next } : item)))
  }, [])

  const removeItem = useCallback((id) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const openCart = useCallback(() => {
    setCheckoutOpen(false)
    setCartOpen(true)
  }, [])

  const closeCart = useCallback(() => setCartOpen(false), [])

  const openCheckout = useCallback(() => {
    setCartOpen(false)
    setCheckoutOpen(true)
  }, [])

  const closeCheckout = useCallback(() => setCheckoutOpen(false), [])

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => ({ ...item, product: productById(item.id) }))
        .filter((item) => Boolean(item.product)),
    [items],
  )

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [detailedItems],
  )

  const value = useMemo(
    () => ({
      items,
      detailedItems,
      count,
      subtotal,
      addItem,
      setQty,
      removeItem,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
      maxQty: MAX_QTY,
    }),
    [
      items,
      detailedItems,
      count,
      subtotal,
      addItem,
      setQty,
      removeItem,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      isCheckoutOpen,
      openCheckout,
      closeCheckout,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
