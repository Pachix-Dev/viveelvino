import { useEffect, useState } from 'react'
import useCartStore from '../store/cartStore'
import { ItemCart } from './ItemCart'

const ShoppingCart = () => {
  const { items, total, showCart, show } = useCartStore()

  useEffect(() => {
    if (show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [show])

  const handleToggleCart = () => {
    showCart(!show)
  }

  const handleCheckout = () => {
    showCart(!show)
    window.location.href = '/checkout'
  }
  const handleBackToStore = () => {
    showCart(!show)
    window.location.href = '/tickets'
  }
  return (
    <>
      <div className='flex flex-shrink-0 items-center pe-4'>
        <button className='relative' onClick={handleToggleCart}>
          <span className='sr-only'>Open your cart</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-7 h-7 sm:w-8 sm:h-8 pointer-events-none'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
            ></path>
          </svg>
          {items.length > 0 ? (
            <span className='absolute -right-2 -top-1 sm:-right-1 sm:top-0 bg-emerald-900 text-white text-[12px] rounded-full'>
              <i className='w-5 h-5 flex justify-center text-center items-center'>
                {items.length}
              </i>
            </span>
          ) : null}
        </button>
      </div>

      {show && (
        <div className='relative z-50'>
          <div className='fixed inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity'></div>
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute right-0 h-screen w-8/12 bg-gray-900 text-white overflow-hidden'>
              <div className='flex flex-col min-h-full max-h-screen'>
                <div className='flex justify-between border-b-2 border-gray-400 py-4 px-4'>
                  <p className='text-white text-2xl font-bold'>Carrito</p>
                  <button className='text-white' onClick={handleToggleCart}>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      ></path>
                    </svg>
                  </button>
                </div>
                {items.length > 0 ? (
                  <>
                    <div className='flex-1 overflow-y-scroll px-5'>
                      <ul className='divide-y divide-zinc-700'>
                        {items.map((item, index) => (
                          <ItemCart key={index} item={item} />
                        ))}
                      </ul>
                    </div>
                    <div className='border-t-2 border-gray-400 py-6 px-4'>
                      <div className='flex justify-between font-bold text-2xl'>
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <p>Impuestos incluidos.</p>
                      <div className='mt-5'>
                        <button
                          className=' w-full bg-[#002C5B] rounded-lg p-4 flex items-center justify-center'
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className='flex-1 flex flex-col justify-center items-center'>
                    <p className='text-2xl font-bold'>Tu carrito está vacío</p>
                    <button
                      className='bg-[#002C5B] rounded-lg p-4 mt-5'
                      onClick={handleBackToStore}
                    >
                      Volver a la tienda
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ShoppingCart
