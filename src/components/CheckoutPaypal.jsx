import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import useCartStore from '../store/cartStore'

// This value is from the props in the UI
const style = { layout: 'vertical' }

function createOrder() {
  // replace this url with your server
  return fetch(
    'https://react-paypal-js-storybook.fly.dev/api/paypal/create-order',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: '1blwyeo8',
            quantity: 2,
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((order) => {
      // Your code here after create the order
      return order.id
    })
}
function onApprove(data) {
  // replace this url with your server
  return fetch(
    'https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      // Your code here after capture the order
    })
}

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner }) => {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <>
      {showSpinner && isPending && <div className='spinner' />}
      <PayPalButtons
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
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </>
  )
}
