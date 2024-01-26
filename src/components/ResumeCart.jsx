import useCartStore from '../store/cartStore'

export function ResumeCart() {
  const { items, total } = useCartStore()

  return (
    <div className='flex flex-col min-h-full max-h-screen'>
      <p className='py-3 text-gray-500 border-b-2'>
        {items.length} elemento(s)
      </p>
      <div className='flex-1 overflow-y-scroll py-4 border-b-2 h-full'>
        {items.map((item, index) => (
          <div className='py-2' key={index}>
            <div className='flex justify-between text-base font-bold leading-tight'>
              <span>
                {item.name}
                <br />
                <span className='text-gray-500'>x{item.quantity}</span>
              </span>
              <span className='text-gray-500'>
                {' '}
                {item.price * item.quantity} MX$
              </span>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className='flex justify-between text-gray-500 text-md font-bold leading-tight '>
          <span>Subtotal</span>
          <span>{total} MX$</span>
        </div>
        <div className='flex justify-between font-bold leading-tight text-black text-3xl'>
          <span>Total</span>
          <span>{total} MX$</span>
        </div>
      </div>
    </div>
  )
}
