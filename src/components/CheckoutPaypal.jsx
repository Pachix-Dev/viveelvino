import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import useCartStore from '../store/cartStore'

const initialOptions = {
  clientId: 'test',
  currency: 'MXN',
  intent: 'capture',
}

export function CheckoutPaypal() {
  const { items, total } = useCartStore()
  const newTotal = total.toString()

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
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          className='paypal-button'
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'Compra en mi tienda',
                  amount: {
                    value: newTotal,
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
