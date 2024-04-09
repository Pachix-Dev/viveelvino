import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import useCartStore from '../../store/cartStore'
import { RegisterForm } from './RegisterForm'
import { userRegister } from '../../store/userRegister'
import { useState } from 'react'
import { ResumeCheckout } from './ResumeCheckout'

export function CheckoutPaypal() {
  const {
    items,
    total,
    clearCart,
    setcomplete_purchase,
    setInvoiceDownToLoad,
  } = useCartStore()
  const { name, email, phone, catas, companions, completed, dropState } =
    userRegister()

  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const style = { layout: 'vertical' }

  const initialOptions = {
    clientId:
      'AXftdiWOtdPdpICeOzTj98Jv9B6mJEB-vU4Fnc9HUhOJfl48D8Hh5yn0ujxnxgXi2YDonV1oU0swD0rV',
    //'AWi2C-26r9XKnk49X_ekNYfhybZd7KHYyTsXS-4l37yGRygOxOMc0RJxDvA5eqztGBgttO7Fc8u3Bxk8',
    currency: 'MXN',
    intent: 'capture',
  }

  async function createOrder() {
    const response = await fetch(
      'https://viveelvino.igeco.mx/backend/create-order',
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
    setProcessing(true)
    const response = await fetch(
      'https://viveelvino.igeco.mx/backend/complete-order',
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
          catas,
          companions,
        }),
      }
    )
    const orderData = await response.json()
    if (orderData.status) {
      dropState()
      clearCart()
      setcomplete_purchase(true)
      setInvoiceDownToLoad(orderData?.invoice)
      window.location.href = '/thanks-for-your-purchase'
    } else {
      setProcessing(false)
      setMessage(orderData?.message)
    }
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
    <main className='relative mx-auto md:flex grid'>
      <section className='p-5 sm:p-10 w-full sm:w-3/5 sm:order-1 '>
        <div className='flex justify-between items-center'>
          <p className='font-bold text-2xl md:text-4xl'>Finalizar Compra</p>
          <nav aria-label='Breadcrumb'>
            <ol className='flex items-center gap-1 text-lg text-gray-600'>
              <li>
                <a
                  href='/tickets'
                  className='block transition hover:text-gray-700 font-bold'
                >
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
                <span className='block transition font-bold'>Registro</span>
              </li>
            </ol>
          </nav>
        </div>
        <hr />
        <RegisterForm />
        {total === 0 ? (
          ''
        ) : (
          <div className='mt-5 px-7 py-7 mx-auto border rounded-2xl shadow-lg'>
            <p className='font-bold text-2xl'>Método de pago</p>
            <PayPalScriptProvider options={initialOptions}>
              {completed && <ButtonWrapper showSpinner={false} />}
            </PayPalScriptProvider>
            <p className='text-red-600 font-bold text-center'>{message}</p>
          </div>
        )}
      </section>
      <aside className='sm:fixed right-0 top-0 z-50 p-5 w-full sm:w-2/5 sm:order-2 bg-[#f7f7f8] h-auto sm:h-full'>
        <p className='text-center text-2xl font-bold hidden md:block'>
          Resumen del pedido
        </p>
        <ResumeCheckout />
      </aside>
      {processing && (
        <div className='absolute top-0 left-0 bg-gray-400 bg-opacity-85 z-[999] w-full h-screen'>
          <div role='status' className='grid place-items-center w-full h-full'>
            <p className='text-center flex gap-2'>
              <svg
                aria-hidden='true'
                className='w-8 h-8 text-gray-200 animate-spin fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
              <span className='font-bold text-white text-2xl'>
                Estamos procesando la información por favor espere...
              </span>
            </p>
          </div>
        </div>
      )}
    </main>
  )
}
