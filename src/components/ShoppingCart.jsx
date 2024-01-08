import { useState } from "react";
import useCartStore from "../store/cartStore";

const ShoppingCart = () => {
  const { items, total, removeFromCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleToggleCart = () => {
    document.body.classList.toggle("overflow-hidden");
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <div className="flex flex-shrink-0 items-center">
        <button className="relative" onClick={handleToggleCart}>
          <span className="sr-only">Open your cart</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 sm:w-8 sm:h-8 pointer-events-none"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            ></path>
          </svg>
          {items.length > 0 && (
            <div className="absolute -right-2 -top-1 sm:-right-1 sm:top-0 bg-emerald-900 text-white text-[12px] rounded-full">
              <span className="w-5 h-5 flex justify-center text-center items-center">
                {items.length}
              </span>
            </div>
          )}
        </button>
      </div>

      {isCartOpen && (
        <div className="relative z-50">
          <div className="fixed inset-0 bg-slate-400/50 backdrop-blur-sm transition-opacity"></div>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute right-0 h-screen w-8/12 bg-gray-900 text-white overflow-hidden">
              <div className="flex flex-col min-h-full max-h-screen">
                <div className="flex justify-between border-b-2 border-gray-400 py-4 px-4">
                  <p className="text-white text-2xl font-bold">Carrito</p>
                  <button className="text-white" onClick={handleToggleCart}>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                {items.length > 0 ? (
                  <>
                    <div className="flex-1 overflow-y-scroll px-5">
                      <ul className="divide-y divide-zinc-700">
                        {items.map((item, index) => (
                          <li
                            key={index}
                            className="grid py-8 grid-cols-2 gap-3"
                          >
                            <div className="overflow-hidden rounded-lg">
                              {item.name} - ${item.price}
                            </div>
                            <div className="items-end flex justify-between flex-col">
                              <button onClick={() => removeFromCart(item.id)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t-2 border-gray-400 py-6 px-4">
                      <div className="flex justify-between font-bold text-2xl">
                        <p>Subtotal</p>
                        <p>${total}</p>
                      </div>
                      <div className="mt-5">
                        <a
                          href="/checkout"
                          className="bg-[#002C5B] rounded-lg p-4 flex items-center justify-center"
                        >
                          Checkout
                        </a>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col justify-center items-center">
                    <p className="text-2xl font-bold">Tu carrito está vacío</p>
                    <button
                      className="bg-[#002C5B] rounded-lg p-4 mt-5"
                      onClick={handleToggleCart}
                    >
                      Volver a la tienda
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
