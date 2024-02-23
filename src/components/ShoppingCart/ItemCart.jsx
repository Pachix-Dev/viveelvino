import useCartStore from '../../store/cartStore'
import { userRegister } from '../../store/userRegister'

export function ItemCart({ item }) {
  const { items, updateQuantity, removeFromCart } = useCartStore()
  const { addCompanion, removeCompanion, dropCompanions } = userRegister()

  const handleQuantity = (e) => {
    updateQuantity(item.id, e)
    const currentItem = items.find((i) => i.id === item.id)

    if (e === 1) {
      dropCompanions()
      return
    }

    if (currentItem.id === 1) {
      if (e > currentItem.quantity) {
        for (let i = currentItem.quantity; i < e; i++) {
          addCompanion()
        }
      } else {
        for (let i = currentItem.quantity; i > e; i--) {
          removeCompanion()
        }
      }
    }
  }

  const handleRemove = (e) => {
    if (item.id === 1) {
      removeFromCart(item.id)
      removeFromCart(4)
      dropCompanions()
    } else {
      removeFromCart(item.id)
    }
  }

  return (
    <li className='grid py-8 grid-cols-2 gap-3'>
      <div className='overflow-hidden'>
        <span className='font-bold'>{item.name}</span>
        <div className='mt-2'>
          <button
            onClick={() => handleQuantity(item.quantity - 1)}
            alt={`Decrease ${item.name}`}
            aria-label={`Decrease ${item.name}`}
            type='button'
            className='border-2 px-2 leading-[initial] border-gray-300 font-bold'
          >
            -
          </button>
          <span className='border-y-2 px-2  border-gray-300'>
            <span className='sr-only'>Quantity of {item.name}</span>
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantity(item.quantity + 1)}
            alt={`Increase ${item.name}`}
            aria-label={`Increase ${item.name}`}
            type='button'
            className='border-2 px-2 leading-[initial] border-gray-300 font-bold'
          >
            +
          </button>
        </div>
      </div>
      <div className='items-end flex justify-between flex-col'>
        <button onClick={() => handleRemove(item.id)}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            ></path>
          </svg>
        </button>
        ${item.price * item.quantity}
      </div>
    </li>
  )
}
