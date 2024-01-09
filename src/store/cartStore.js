import { create } from 'zustand';
import {persist} from 'zustand/middleware';

const useCartStore = create(
  persist((set) => {
    return {
      items: [],
      total: 0,
      show: false,

      addToCart: (product) => {
        set((state) => ({
          items: [...state.items, product],
          total: state.total + product.price,
        }));
      },

      removeFromCart: (productId) => {
        set((state) => {
          const updatedItems = state.items.filter((item) => item.id !== productId);
          const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);
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

      showCart: (value ) => {
        set({ show: value });
      },  
    }
  }, 
  {
    name: 'cart-storage',
  })
);

export default useCartStore;
