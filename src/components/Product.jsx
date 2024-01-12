import useCartStore from '../store/cartStore'
import { useState } from 'react'

export function Products({ product }) {
  const { show, addToCart, showCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = (product) => {
    addToCart(product, quantity)
    setQuantity(1)
    document.body.classList.toggle('overflow-hidden')
    showCart(!show)
  }
  return (
    <>
      <div
        key={product.id}
        className='mt-5 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'
      >
        <h5 className='mb-4 text-xl font-medium text-gray-500 '>
          {product.name}
        </h5>
        <div className='flex items-baseline text-gray-900 '>
          <span className='text-3xl font-semibold'>$</span>
          <span className='text-5xl font-extrabold tracking-tight'>
            {product.price}
          </span>
          <span className='ms-1 text-xl font-normal text-gray-500 '>
            / persona
          </span>
        </div>
        <ul role='list' className='space-y-5 my-7'>
          {product.include.map((list, index) => (
            <li key={index} className='flex items-center'>
              <svg
                className='flex-shrink-0 w-4 h-4 text-blue-600 '
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
              <span className='text-base font-normal leading-tight text-gray-500  ms-3'>
                {list}
              </span>
            </li>
          ))}
        </ul>
        <ul role='list' className='space-y-5 my-7'>
          {product.notInclude.map((list, index) => (
            <li key={index} className='flex line-through decoration-gray-500'>
              <svg
                className='flex-shrink-0 w-4 h-4 text-gray-400 '
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
              </svg>
              <span className='text-base font-normal leading-tight text-gray-500 ms-3'>
                {list}
              </span>
            </li>
          ))}
        </ul>
        <div className='flex gap-2'>
          <input
            type='number'
            value={quantity}
            className='border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 font-medium text-sm text-center'
            onChange={(e) =>
              setQuantity(Math.min(8, parseInt(e.target.value, 10)))
            }
            min='1'
            max='8'
          />
          <button
            onClick={() => handleAddToCart(product)}
            type='button'
            className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  )
}
