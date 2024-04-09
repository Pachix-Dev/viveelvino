import useCartStore from '../store/cartStore.js'
import Confetti from './Confetti.jsx'
export function Purchase() {
  const { complete_purchase, invoiceDownToLoad } = useCartStore()
  if (!complete_purchase) {
    window.location.href = '/tickets'
  }

  return (
    <>
      {complete_purchase && (
        <div className='h-screen container mx-auto px-4 grid place-content-center place-items-center'>
          <Confetti />
          <img src='/confetti-purchase.webp' width='150' />
          <p className='mt-5 font-bold text-4xl'>Gracias por tu compra!</p>
          <p className='text-gray-400 text-lg'>
            Pronto recibiras una confirmación por correo con los detalles de tu
            compra.
          </p>
          {invoiceDownToLoad && (
            <a
              className='font-bold bg-[#DB00AE] hover:bg-[#21B380] text-white rounded-lg p-4 mt-5 '
              href={`https://viveelvino.igeco.mx/invoices/${invoiceDownToLoad}`}
              target='_blank'
            >
              DESCARGA TUS BOLETOS
            </a>
          )}
        </div>
      )}
    </>
  )
}
