import useCartStore from '../../store/cartStore'
import './Addons.css'

export function Addons({ user, catas }) {
  const { addVip, items, removeVip } = useCartStore()

  const handleaddVip = async (product) => {
    if (items.find((item) => item.id === 1)) {
      addVip(product, 1, user)
    }
  }

  return (
    <>
      <p className='pt-4 font-bold'>
        Mejora tu experiencia (con costo adicional)
      </p>
      <p>
        Sumérgete en una experiencia sensorial única con nuestras exclusivas
        catas VIP.
      </p>
      <div
        className='flex items-center gap-5 overflow-x-scroll p-4'
        style={{ scrollSnapType: 'both mandatory' }}
      >
        {catas.map((cata, index) => (
          <div
            key={index}
            className='bg-dorado border rounded-md shadow-2xl p-4 snap-mandatory  text-[#281D04]'
          >
            <p className='font-extrabold text-lg leading-5 uppercase '>
              {cata.name}
            </p>
            <p className='text-lg leading-5'>{cata?.description}</p>
            <p className='font-bold text-lg leading-4 mt-5 text-yellow-950'>
              {cata.hora} - Sala Premier
            </p>
            <div className='mt-2 flex justify-between items-center'>
              <p className='font-extrabold text-2xl'>{cata.price} MX$</p>
              {items.find(
                (item) => item?.user === user && item.id === cata.id
              ) ? (
                <button
                  onClick={() => removeVip(cata.id, user)}
                  type='button'
                  className='font-bold border rounded-lg p-2 bg-red-600 text-white hover:bg-red-800 hover:text-white'
                >
                  Eliminar
                </button>
              ) : cata?.soldOut !== true ? (
                <button
                  onClick={() => handleaddVip(cata)}
                  type='button'
                  className='font-bold border rounded-lg p-2 bg-[#000000] text-white hover:bg-red-800 hover:text-white'
                >
                  Agregar
                </button>
              ) : (
                <p className='bg-gray-500 font-bold p-2 text-white rounded-lg'>
                  Sold Out
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
