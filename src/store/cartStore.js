import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist((set) => ({
    items: [],
    total: 0,
    complete_purchase: false,    
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
            total: state.total + (newItem.price * newItem.quantity),
          };
        }
      });
    },

    updateQuantity: (productId, newQuantity) => {
      if (newQuantity < 1 || newQuantity > 8) { 
        return;
      }
      set((state) => {
        // quitar catas vip si se agrega un general y menor de edad
        const newItems=state.items.filter((item) => item.id === 1 || item.id === 2);
              

        const updatedItems = newItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        );
    
        let newTotal = 0;
        newTotal += updatedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
      });
    },

    setcomplete_purchase: (value) => set({ complete_purchase: value }),

    addDiscount: (product, type) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.name === product.name);
        const onlyGeneral = state.items.find((item) => item.id === 1);
        const onlyVip = state.items.find((item) => item.id === 3 || item.id === 4 || item.id === 5 || item.id === 6);
        
        if(type === 'GENERAL'){
          if (!onlyGeneral || existingItem || state.total === 0 || state.total < 499) {                      
            return state;
          } else {
            const newItems = [...state.items, product];
            return {
              items: newItems,
              total: state.total + product.price * product.quantity,
            };
          }
        }

        if(type === 'VIP'){
          if (!onlyVip || existingItem || state.total === 0 || state.total < 820) {                      
            return state;
          } else {
            const newItems = [...state.items, product];
            return {
              items: newItems,
              total: state.total + product.price * product.quantity,
            };
          }
        }
        
      });
    },
    
    setInvoiceDownToLoad: (value) => set({ invoiceDownToLoad: value }),

    addVip: (product, quantity = 1, user) => {
      set((state) => {        
        const onlyGeneral = state.items.find((item) => item.id === 1);
        if (!onlyGeneral) {                      
          return state;
        } else {
          const newItem = {
            ...product,
            quantity,
            user,
          };

          const newItems = [...state.items, newItem];
          return {
            items: newItems,
            total: state.total + newItem.price * newItem.quantity,
          };
        }
      });
    },

    removeVip: (productId, userId) => {
      set((state) => {
        const findItem = state.items.find((item) => item?.user === userId && item.id === productId);
    
        if (!findItem) {
          // If item is not found, return the current state
          return state;
        }
    
        const updatedItems = state.items.filter(item => !(item.id === findItem.id && item.user === findItem.user || item.id === 99  || item.id === 0 || item.id === 66));
        
        const totalToRemove = updatedItems.map((item) => item.price * item.quantity).reduce((acc, item) => acc + item, 0);
    
        
    
        return {
          items: updatedItems,
          total: totalToRemove,
        };
      });
    },
  
    addDiscount_5: () => {      
      set((state) => {
          const existingItem = state.items.find((item) => item.id === 66);
          if (existingItem || state.total === 0 ) {                      
              return state;
          } else {
              const discountAmount = state.total * 0.05;
              const formattedDiscountAmount = discountAmount.toFixed(2); // Format discount amount to two decimal places
              const newItem = {
                  id: 66,
                  name: 'COPARECORD 5% DESCUENTO',
                  price: -parseFloat(formattedDiscountAmount), // Ensure price is negative
                  quantity: 1,
              };
  
              const newItems = [...state.items, newItem];
              const newTotal = state.total - parseFloat(formattedDiscountAmount); // Subtract the formatted discount amount from the total
              return {
                  items: newItems,
                  total: newTotal,
              };
          }
      });
    }
  
    
  }),
  {
    name: 'cart-storage',
  })
);

export default useCartStore;
