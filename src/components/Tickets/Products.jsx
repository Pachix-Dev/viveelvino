import useCartStore from '../../store/cartStore'

export function Products() {
  const { addToCart, setcomplete_purchase } = useCartStore()

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    setcomplete_purchase(false)
    window.location.href = '/shopping-cart'
  }

  const products = [
    {
      id: 1,
      name: 'Acceso General',
      price: 499,
      regularPrice: 599,
      include: [
        'Acceso a la feria ambos días',
        'Una copa conmemorativa ',
        'Degustaciones de vino',
        'Música en vivo ambos días',
        'Cat\u00E1logo de expositores digital',
      ],
    },
    {
      id: 2,
      name: 'Acceso menor de edad ambos días',
      price: 100,
      regularPrice: 150,
      include: ['Acceso a la feria'],
      notInclude: [
        'Ludoteca y Actividades especiales para ni\u00F1os (con costo adicional dependiendo la actividad)',
      ],
    },
  ]

  return (
    <>
      {products.map((product) => (
        <div
          key={product.id}
          className='mt-5 w-full md:max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8'
        >
          <h5 className='mb-4 text-xl font-medium text-gray-500 '>
            {product.name}
          </h5>
          <div className='flex items-baseline text-gray-900 '>
            <span className='text-3xl font-semibold'>$</span>
            <span className='text-5xl font-extrabold tracking-tight'>
              {product.price}
            </span>
            <span className='font-bold'>MXN</span>
            <span className='ms-1 text-xl font-normal text-gray-500 '>
              / persona
            </span>
          </div>
          <p className='text-gray-500'>
            <span className='line-through'>$ {product.regularPrice} </span> MXN
            precio regular en sitio
          </p>
          <ul role='list' className='space-y-5 my-7'>
            {product?.include?.map((list, index) => (
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
            {product.notInclude &&
              product.notInclude.map((list, index) => (
                <li key={index} className='flex  decoration-gray-500'>
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
            <button
              onClick={() => handleAddToCart(product)}
              type='button'
              className='text-white bg-[#374151] hover:bg-[#941E81] focus:ring-4 focus:outline-none focus:ring-blue-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
