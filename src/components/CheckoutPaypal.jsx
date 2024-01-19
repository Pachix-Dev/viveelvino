import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import useCartStore from '../store/cartStore'

const initialOptions = {
  clientId: 'test',
  currency: 'MXN',
  intent: 'capture',
}

export function CheckoutPaypal() {
  const { items, total } = useCartStore()

  // Conditionally render PayPal button only if there are items in the cart
  if (items.length === 0) {
    return (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <p className='text-2xl font-bold'>Tu carrito está vacío</p>
        <a
          className='bg-[#002C5B] text-white rounded-lg p-4 mt-5'
          href='/tickets'
        >
          Volver a la tienda
        </a>
      </div>
    )
  }

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Compra en mi tienda',
                  amount: {
                    value: '0.01',
                  },
                },
              ],
            })
          }}
          onApprove={(data, actions) => {
            return actions.order.capture()
          }}
        />
      </PayPalScriptProvider>
    </>
  )
}
