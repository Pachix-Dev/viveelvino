import React, { useState } from "react";
import useCartStore from "../store/cartStore";

const ShoppingCart = () => {
  const { items, total, removeFromCart, clearCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleToggleCart = () => {
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
        <div className="absolute z-10 top-0 right-0 h-screen w-8/12 bg-gray-900 text-white">
          <h2 className="text-white">Carritos de Compras</h2>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}{" "}
                <button onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={() => clearCart()}>Limpiar Carrito</button>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
