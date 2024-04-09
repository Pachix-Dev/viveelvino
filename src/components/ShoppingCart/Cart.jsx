import useCartStore from '../../store/cartStore'
import { ResumeCart } from './ResumeCart'
import { ItemCart } from './ItemCart'
import { Products } from '../Tickets/Products'

export function Cart() {
  const { items } = useCartStore()

  if (items.length === 0) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center h-screen'>
        <p className='text-2xl font-bold'>Tu carrito está vacío</p>
        <a
          href='/tickets'
          className='bg-[#002C5B] hover:bg-[#941E81] text-white rounded-lg p-4 mt-5'
        >
          Volver a la tienda
        </a>
      </div>
    )
  }

  return (
    <main className='mt-5 mx-auto md:flex grid'>
      <section className='pt-5 px-5 md:px-32 w-full md:h-screen md:w-3/5 md:overflow-y-scroll'>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-2xl md:text-4xl'>Sus Productos</p>
          <nav aria-label='Breadcrumb'>
            <ol className='flex items-center gap-1 text-lg text-gray-600'>
              <li>
                <a href='/tickets' className='block transition font-bold '>
                  Tickets
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
                <span className='block transition'>Registro</span>
              </li>
            </ol>
          </nav>
        </div>
        <hr />
        {items.map((item, index) => (
          <ItemCart key={index} item={item} />
        ))}
        <div className='pt-5 grid md:flex justify-center gap-4'>
          <Products />
        </div>
      </section>
      <aside className='p-5 w-full md:h-screen md:w-2/5'>
        <p className='text-center text-2xl font-bold hidden md:block'>
          Resumen del pedido
        </p>
        <ResumeCart />
        <a
          href='/checkout'
          className='bg-[#941E81] hover:bg-gray-700 text-white text-lg font-bold text-center block border rounded-lg p-2'
        >
          Continuar
        </a>
      </aside>
    </main>
  )
}
