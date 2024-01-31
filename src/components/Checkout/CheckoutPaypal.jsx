import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import useCartStore from '../../store/cartStore'
import { ResumeCart } from '../ShoppingCart/ResumeCart'
import { RegisterForm } from './RegisterForm'

export function CheckoutPaypal() {
  const { items, total } = useCartStore()

  const style = { layout: 'vertical' }

  const initialOptions = {
    clientId:
      'AUpG-JiDKsOb-czCXvSOr38RrrU3rR9s_1TxOmnjbgdvKNFOdotO42LJb-1-oHG5oSWMfNrKUTFE_Wyf',
    currency: 'MXN',
    intent: 'capture',
  }

  function createOrder() {
    return fetch('https://hfmexico.mx/viveelvino/backend/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        total,
      }),
    })
      .then((response) => response.json())
      .then((order) => {
        // Your code here after create the order
        return order.id
      })
  }

  function onApprove(data) {
    return fetch('https://hfmexico.mx/viveelvino/backend/complete-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        console.log(orderData)
      })
  }

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer()

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          className='paypal-button'
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource={undefined}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </>
    )
  }

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
    <main className='mx-auto md:flex grid'>
      <section className='p-10 w-3/5'>
        <div className='flex justify-between'>
          <p className='font-bold text-2xl'>Regístrese</p>
          <nav aria-label='Breadcrumb'>
            <ol className='flex items-center gap-1 text-sm text-gray-600'>
              <li>
                <a
                  href='/shopping-cart'
                  className='block transition hover:text-gray-700'
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
                  className='block transition hover:text-gray-700 font-bold'
                >
                  Checkout
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <hr />
        <RegisterForm />
        <div className='mt-5 mx-auto'>
          <PayPalScriptProvider options={initialOptions}>
            <ButtonWrapper showSpinner={false} />
          </PayPalScriptProvider>
        </div>
      </section>
      <aside
        className='p-5 w-2/5 bg-[#f7f7f8]'
        style={{ height: 'calc(100vh - 85px)' }}
      >
        <p className='text-center text-2xl font-bold hidden md:block'>
          Resumen del pedido
        </p>
        <ResumeCart />
        <button className='mt-3 bg-blue-500 text-white text-lg font-bold border rounded-lg w-full p-2'>
          Pagar
        </button>
      </aside>
    </main>
  )
}
