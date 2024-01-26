import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import useCartStore from '../store/cartStore'

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
    <>
      <PayPalScriptProvider options={initialOptions}>
        <ButtonWrapper showSpinner={false} />
      </PayPalScriptProvider>
    </>
  )
}
