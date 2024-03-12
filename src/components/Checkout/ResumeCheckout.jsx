import useCartStore from '../../store/cartStore'

export function ResumeCheckout() {
  const { items, total, appliedCoupons } = useCartStore()

  function formatAmountMXN(amount) {
    const formattedAmount = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount)

    return formattedAmount
  }
  return (
    <div className='flex flex-col justify-between h-4/5'>
      <p className='py-3 text-gray-500 border-b-2'>
        {items.length} elemento(s)
      </p>
      <div className='flex-1 overflow-y-scroll border-b-2 h-52'>
        {items.map((item, index) => (
          <div key={index} className='my-4 flex justify-between'>
            <p className='leading-4'>
              <span className='font-bold'>{item.name}</span>
              <br />
              <span className='text-gray-500 '>
                x{item.quantity} /{' '}
                {item.id === 1 || item.id === 2 ? 'persona(s)' : 'descuento'}
              </span>
            </p>
            <span>{formatAmountMXN(item.price * item.quantity)} MXN</span>
          </div>
        ))}
        {/*{appliedCoupons.map((coupon, index) => (
          <div key={index} className='my-4 flex justify-between'>
            <p className='leading-4'>
              <span className='font-bold'>{coupon}</span>
              <br />
              <span className='text-gray-500 '>Cupon de descuento</span>
            </p>
            <span>- {formatAmountMXN(499)} MXN</span>
          </div>
        ))}*/}
      </div>
      <div className='py-3'>
        <div className='mt-5 flex justify-between text-gray-500 text-md font-bold leading-tight '>
          <span>Subtotal</span>
          <span>{formatAmountMXN(total)} MXN</span>
        </div>
        <div className='flex justify-between font-bold leading-tight text-black text-3xl'>
          <span>Total</span>
          <span>{formatAmountMXN(total)} MXN</span>
        </div>
      </div>
    </div>
  )
}
