import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist((set) => {
    return {
      items: [],
      total: 0,
      complete_purchase: false,

      addToCart: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);
      
          if (existingItem) {
            const newQuantity = Math.min(existingItem.quantity + quantity, 8); // Limit to 8
            const updatedItems = state.items.map((item) =>
              item.id === product.id ? { ...item, quantity: newQuantity } : item
            );
      
            const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      
            return {
              items: updatedItems,
              total: updatedTotal,
            };
          } else {
            const newItem = {
              ...product,
              quantity: Math.min(quantity, 8), // Limit to 8
            };
      
            return {
              items: [...state.items, newItem],
              total: state.total + newItem.price * newItem.quantity,
            };
          }
        });
      },

      updateQuantity: (productId, newQuantity) => {
        if (newQuantity < 1 || newQuantity > 8) { 
          return;
        }
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );

          const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== productId);
          const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
          return {
            items: updatedItems,
            total: updatedTotal,
          };
        });
      },

      clearCart: () => {
        set({
          items: [],
          total: 0,
        });
      },

      setcomplete_purchase: (value) => set({ complete_purchase: value }),
    };
  },
  {
    name: 'cart-storage',
  })
);

export default useCartStore;
