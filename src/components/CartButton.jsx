import useCartStore from '../store/cartStore'

export function CartButton() {
  const { items } = useCartStore()

  return (
    <>
      {items.length > 0 ? (
        <span className='absolute -right-2 -top-1 sm:-right-1 sm:top-0 bg-emerald-900 text-white text-[12px] rounded-full'>
          <i className='w-5 h-5 flex justify-center text-center items-center'>
            {items.length}
          </i>
        </span>
      ) : null}
    </>
  )
}
