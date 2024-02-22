import useCartStore from '../../store/cartStore'

export function Addons() {
  const catas = [
    {
      id: 4,
      name: 'Bodega Barisal',
      price: 999.0,
    },
    {
      id: 5,
      name: 'Casa Establo',
      price: 999.0,
    },
    {
      id: 6,
      name: 'Casa Zamora',
      price: 999.0,
    },
    {
      id: 7,
      name: 'Cava Sarquis',
      price: 999.0,
    },
    {
      id: 8,
      name: 'Tierra De Luz',
      price: 999.0,
    },
    {
      id: 9,
      name: 'Vinicola Santo Domingo',
      price: 999.0,
    },
    {
      id: 10,
      name: 'Cata 6',
      price: 999.0,
    },
    {
      id: 11,
      name: 'Cata 7',
      price: 999.0,
    },
    {
      id: 12,
      name: 'Cata 8',
      price: 999.0,
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
      <p className='py-4 font-bold'>Mejore su experiencia con catas VIP</p>
      <p>
        Sumérgete en una experiencia sensorial única con nuestra exclusiva Cata
        VIP. Descubre los matices más exquisitos y los sabores más refinados
        mientras te guiamos a través de una selección cuidadosamente curada de
        productos premium.
      </p>

      {catas.map((cata, index) => (
        <div key={index} className='mt-10 border rounded-md  shadow-2xl p-4'>
          <div className='flex justify-between'>
            <p className='font-bold text-lg leading-4'>
              {cata.name}
              <br />
              <span className='text-gray-500 text-sm'>{cata.price} MX$</span>
            </p>
            <button
              onClick={() => handleAddToCart(cata)}
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
