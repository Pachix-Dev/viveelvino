import useCartStore from '../../store/cartStore'

export function Addons() {
  const catas = {
    id: 4,
    name: 'Cata Vip',
    price: 999.0,
  }
  const { addToCart, items } = useCartStore()

  const handleAddToCart = (product) => {
    if (items.find((item) => item.id === 1)) {
      addToCart(product, 1)
    }
  }
  return (
    <>
      <p className='py-4 font-bold'>Mejore su experiencia con catas VIP</p>
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
          refinados mientras te guiamos a través de una selección cuidadosamente
          curada de productos premium.
        </p>
      </div>
    </>
  )
}
