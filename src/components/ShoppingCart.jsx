import React from 'react';
import useCartStore from '../store/cartStore';

const ShoppingCart = () => {
  const { items, total, addToCart, removeFromCart, clearCart } = useCartStore();

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}{' '}
            <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <p>Total: ${total}</p>
      <button onClick={() => clearCart()}>Limpiar Carrito</button>
    </div>
  );
};

export default ShoppingCart;
