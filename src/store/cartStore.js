import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist((set) => ({
    items: [],
    total: 0,
    complete_purchase: false,
    appliedCoupons: [],
    invoiceDownToLoad: '',

    addToCart: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {            
          return state;
        } else {
          const newItem = {
            ...product,
            quantity: Math.min(quantity, 8),
          };

          const newItems = [...state.items, newItem];
          return {
            items: newItems,
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
    
        let newTotal = state.total;
        const existingItem = state.items.find((item) => item.id === productId);
    
        if (existingItem) {
          newTotal += (newQuantity - existingItem.quantity) * existingItem.price;
        }
    
        // Validate total is not less than 0
        if (newTotal < 0) {
          return state;
        }
    
        return {
          items: updatedItems,
          total: newTotal,
        };
      });
    },
    

    removeFromCart: (productId) => {
      set((state) => {
        const updatedItems = state.items.filter((item) => item.id !== productId);
        return {
          items: updatedItems,
          total: state.total - state.items.find((item) => item.id === productId).price * state.items.find((item) => item.id === productId).quantity,
        };
      });
    },

    clearCart: () => {
      set({
        items: [],
        total: 0,
        appliedCoupons: [],
      });
    },

    setcomplete_purchase: (value) => set({ complete_purchase: value }),

    addDiscount: (product) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.name === product.name);
        const onlyGeneral = state.items.find((item) => item.id === 1);

        if (!onlyGeneral || existingItem || state.total === 0 || state.total < 499) {                      
          return state;
        } else {
          const newItems = [...state.items, product];
          return {
            items: newItems,
            total: state.total + product.price * product.quantity,
          };
        }
      });
    },
    
    setInvoiceDownToLoad: (value) => set({ invoiceDownToLoad: value }),
  }),
  {
    name: 'cart-storage',
  })
);

export default useCartStore;
