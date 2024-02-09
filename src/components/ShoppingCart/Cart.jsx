import useCartStore from '../../store/cartStore'
import { ResumeCart } from './ResumeCart'
import { ItemCart } from './ItemCart'
import { Addons } from './Addons'

export function Cart() {
  const { items } = useCartStore()

  if (items.length === 0) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-bold'>Tu carrito está vacío</p>
        <a
          href='/tickets'
          className='bg-[#002C5B] text-white rounded-lg p-4 mt-5'
        >
          Volver a la tienda
        </a>
      </div>
    )
  }

  return (
    <main className='mt-5 mx-auto md:flex grid'>
      <section className='p-5 w-full sm:w-3/5'>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-2xl'>Sus Productos</p>
          <nav aria-label='Breadcrumb'>
            <ol className='flex items-center gap-1 text-sm text-gray-600'>
              <li>
                <a
                  href='/shopping-cart'
                  className='block transition hover:text-gray-700 font-bold'
                >
                  Carrito
                </a>
              </li>

              <li className='rtl:rotate-180'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </li>

              <li>
                <a
                  href='/checkout'
                  className='block transition hover:text-gray-700'
                >
                  Checkout
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <hr />
        {items.map((item, index) => (
          <ItemCart key={index} item={item} />
        ))}
        {items.find((item) => item.id === 1) && <Addons />}
      </section>
      <aside className='p-5 w-full sm:w-2/5 bg-[#f7f7f8]'>
        <p className='text-center text-2xl font-bold hidden md:block'>
          Resumen del pedido
        </p>
        <ResumeCart />
        <a
          href='/checkout'
          className='bg-blue-600 text-white text-lg font-bold text-center block border rounded-lg p-4'
        >
          Continuar
        </a>
      </aside>
    </main>
  )
}