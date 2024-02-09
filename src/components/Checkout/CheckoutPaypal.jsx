import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import useCartStore from '../../store/cartStore'
import { ResumeCart } from '../ShoppingCart/ResumeCart'
import { RegisterForm } from './RegisterForm'
import { userRegister } from '../../store/userRegister'

export function CheckoutPaypal() {
  const { items, total, clearCart, setcomplete_purchase } = useCartStore()
  const { name, email, phone, company, completed, dropState } = userRegister()

  const style = { layout: 'vertical' }

  const initialOptions = {
    clientId:
      'AWi2C-26r9XKnk49X_ekNYfhybZd7KHYyTsXS-4l37yGRygOxOMc0RJxDvA5eqztGBgttO7Fc8u3Bxk8',
    currency: 'MXN',
    intent: 'capture',
  }

  async function createOrder() {
    const response = await fetch(
      'https://hfmexico.mx/viveelvino/backend/create-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          total,
        }),
      }
    )
    const order = await response.json()
    return order.id
  }

  async function onApprove(data) {
    const response = await fetch(
      'https://hfmexico.mx/viveelvino/backend/complete-order',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: data.orderID,
          items,
          total,
          name,
          email,
          phone,
          company,
        }),
      }
    )
    const orderData = await response.json()
    if (orderData.status) {
      dropState()
      clearCart()
      setcomplete_purchase(true)
      window.location.href = '/thanks-for-your-purchase'
    }
    console.log(orderData)
  }

  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer()

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          className='py-5'
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
      <section className='p-10 w-full sm:w-3/5 sm:order-1 '>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-2xl'>Finalizar Compra</p>
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
        <div className='mt-5 px-7 py-7 mx-auto border rounded-2xl shadow-lg'>
          <p className='font-bold text-2xl'>Método de pago</p>
          <PayPalScriptProvider options={initialOptions}>
            {completed && <ButtonWrapper showSpinner={false} />}
          </PayPalScriptProvider>
        </div>
      </section>
      <aside className='p-5 w-full sm:w-2/5 sm:order-2 bg-[#f7f7f8] h-auto sm:h-full'>
        <p className='text-center text-2xl font-bold hidden md:block'>
          Resumen del pedido
        </p>
        <ResumeCart />
      </aside>
    </main>
  )
}
