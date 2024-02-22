import useCartStore from '../../store/cartStore'

export function Catasfree() {
  const catas = [
    {
      id: 5,
      name: 'Cata 1',
      price: 0,
    },
    {
      id: 6,
      name: 'Cata 2',
      price: 0,
    },
    {
      id: 7,
      name: 'Cata 3',
      price: 0,
    },
    {
      id: 8,
      name: 'Cata 4',
      price: 0,
    },
    {
      id: 9,
      name: 'Cata 5',
      price: 0,
    },
    {
      id: 10,
      name: 'Cata 6',
      price: 0,
    },
    {
      id: 11,
      name: 'Cata 7',
      price: 0,
    },
    {
      id: 12,
      name: 'Cata 8',
      price: 0,
    },
  ]
  const { addToCart, items } = useCartStore()

  const handleAddToCart = (product) => {
    if (items.find((item) => item.id === 1)) {
      addToCart(product, 1)
    }
  }
  return (
    <>
      <p className='pt-4 font-bold'>
        Catas incluidas con tu Acceso General puedes elegir hasta 3:
      </p>
      <p>Aparta tu lugar cupo limitado.</p>

      {catas.map((cata, index) => (
        <div className='border rounded-md  shadow-2xl p-4'>
          <div className='flex justify-between'>
            <p className='font-bold text-lg leading-4'>
              Cata VIP
              <br />
              <span className='text-gray-500 text-sm'>
                999.00 MX$ / por bodega
              </span>
            </p>
            <button
              onClick={() => handleAddToCart(catas)}
              className='border rounded-lg px-2 border-blue-600 text-blue-600'
            >
              Agregar
            </button>
          </div>
          <p className='mt-2'>
            Sumérgete en una experiencia sensorial única con nuestra exclusiva
            Cata VIP. Descubre los matices más exquisitos y los sabores más
            refinados mientras te guiamos a través de una selección
            cuidadosamente curada de productos premium.
          </p>
        </div>
      ))}
    </>
  )
}
