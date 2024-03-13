import { useState } from 'react'
import useCartStore from '../../store/cartStore'

export function CouponDiscount() {
  const [couponCode, setCouponCode] = useState('')
  const [couponStatus, setCouponStatus] = useState('')
  const [isValidCoupon, setIsValidCoupon] = useState(null)

  const { addDiscount } = useCartStore()

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value)
    setIsValidCoupon(null)
    setCouponStatus('')
  }

  const checkCoupon = async () => {
    try {
      const response = await fetch(
        'https://viveelvino.igeco.mx/backend/check-coupon',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ couponCode }),
        }
      )

      const data = await response.json()

      if (data.status) {
        setCouponStatus('Cupon valido!, limitado a 1 solo uso!')
        setIsValidCoupon(true)
        addDiscount({ id: 0, name: couponCode, price: -499, quantity: 1 })
        setCouponCode('')
      } else {
        setCouponStatus('Invalid coupon or used already.')
        setIsValidCoupon(false)
      }
    } catch (error) {
      console.error('Error checking coupon:', error)
      setCouponStatus('Failed to check the coupon.')
      setIsValidCoupon(false)
      setCouponCode('')
    }
    setCouponCode('')
  }

  // Determine button classes based on whether the input is empty
  const buttonClasses = couponCode.trim()
    ? 'bg-[#941E81] text-white font-bold p-2 rounded-xl'
    : 'bg-gray-400 text-white font-bold p-2 rounded-xl'

  // Determine status message class based on validation result
  const statusMessageClasses = isValidCoupon
    ? 'text-green-600 font-bold'
    : 'text-red-600 font-bold'

  return (
    <>
      <div className='flex gap-4 justify-between pt-5'>
        <input
          type='text'
          className='w-full border-2 border-gray-300 rounded-lg px-2 py-1 focus:border-[#941E81] focus: focus:ring-[#941E81]'
          placeholder='Código de descuento'
          value={couponCode}
          onChange={handleCouponChange}
        />
        <button
          className={buttonClasses}
          onClick={checkCoupon}
          disabled={!couponCode.trim()}
        >
          Aplicar
        </button>
      </div>
      {couponStatus && (
        <p className={isValidCoupon !== null ? statusMessageClasses : ''}>
          {couponStatus}
        </p>
      )}
    </>
  )
}
