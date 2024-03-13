/*import { useState } from 'react'*/
import useCartStore from '../../store/cartStore'
import { userRegister } from '../../store/userRegister'
import './ItemCart.css'

export function ItemCart({ item }) {
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore()
  const {
    addCompanion,
    removeCompanion,
    dropCompanions,
    /*addCata,
    catas,*/
    dropState,
  } = userRegister()

  const handleQuantity = (e) => {
    updateQuantity(item.id, e)
    const currentItem = items.find((i) => i.id === item.id)

    if (currentItem.id === 1 && e === 1) {
      dropCompanions()
      return
    }

    if (currentItem.id === 1) {
      if (e > currentItem.quantity) {
        for (let i = currentItem.quantity; i < e; i++) {
          addCompanion(e)
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
      clearCart()
      dropState()
    } else {
      removeFromCart(item.id)
    }
  }

  /*const [selectedCheckboxes, setSelectedCheckboxes] = useState(
    catas.length > 0 ? catas[0] : []
  )

  const handleCheckboxChange = (value) => {
    const currentIndex = selectedCheckboxes.indexOf(value)
    const newChecked = [...selectedCheckboxes]

    if (currentIndex === -1) {
      // If not already in array, add to array
      newChecked.push(value)
    } else {
      // If already in array, remove from array
      newChecked.splice(currentIndex, 1)
    }
    // Check if more than 3 are selected, and if so, remove the last one
    if (newChecked.length > 3) {
      newChecked.shift()
    }
    setSelectedCheckboxes(newChecked)
    addCata(newChecked)
  }

  const checkboxes = [
    { value: 1, label: 'Cata 1' },
    { value: 2, label: 'Cata 2' },
    { value: 3, label: 'Cata 3' },
    { value: 4, label: 'Cata 4' },
    { value: 5, label: 'Cata 5' },
    { value: 6, label: 'Cata 6' },
    { value: 7, label: 'Cata 7' },
    { value: 8, label: 'Cata 8' },
  ]*/

  return (
    <>
      {item.id === 0 ? (
        ''
      ) : (
        <li className='mt-10 py-3 flex flex-wrap gap-2  rounded-xl border-2 shadow-xl p-4'>
          <div className='flex-1 '>
            <div className='flex items-center text-2xl'>
              {item.id === 1 || item.id === 2 ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-10 h-10 me-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='icon icon-tabler icon-tabler-glass'
                  width='40'
                  height='40'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                  <path d='M8 21l8 0' />
                  <path d='M12 15l0 6' />
                  <path d='M17 3l1 7c0 3.012 -2.686 5 -6 5s-6 -1.988 -6 -5l1 -7h10z' />
                </svg>
              )}
              <span className='font-bold'>{item.name}</span>
            </div>
            <div className='mt-2'>
              <p className='text-lg font-bold'>
                Seleccione la cantidad de boletos
              </p>
              <p className='text-sm'>La cantidad mínima es 1 boleto.</p>
              <div className='mt-2'>
                <button
                  onClick={() => handleQuantity(item.quantity - 1)}
                  alt={`Decrease ${item.name}`}
                  aria-label={`Decrease ${item.name}`}
                  type='button'
                  className='border-2 rounded-s-lg px-2 leading-[initial] border-gray-300 font-bold'
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
                  className='border-2 rounded-e-lg px-2 leading-[initial] border-gray-300 font-bold'
                >
                  +
                </button>
              </div>
            </div>
            {/*item.id === 1 && (
            <>
              <p className='mt-2 text-gray-500'>
                (Opcional - tu acceso general te permite realizar hasta 3 catas
                sencillas / cupo limitado con tiempo de espera )
              </p>
              <ul className='list-catas mt-2 p-3 w-ful h-40 overflow-y-scroll text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-xl *:border-b'>
                {checkboxes.map((checkbox, index) => (
                  <li key={index}>
                    <div className='flex items-center ps-3'>
                      <input
                        id={checkbox.value}
                        name={checkbox.value}
                        type='checkbox'
                        value={checkbox.value}
                        checked={selectedCheckboxes.includes(checkbox.label)}
                        onChange={() => handleCheckboxChange(checkbox.label)}
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2'
                      />
                      <label
                        htmlFor={checkbox.value}
                        className='w-full py-1 m-2 text-sm font-medium text-gray-900 '
                      >
                        {checkbox.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </>
                )*/}
          </div>
          <div className='flex items-center justify-end'>
            <button onClick={() => handleRemove(item.id)}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-8 h-8 hover:stroke-[#941E81]'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                ></path>
              </svg>
            </button>
          </div>
        </li>
      )}
    </>
  )
}
