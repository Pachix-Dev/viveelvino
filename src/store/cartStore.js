import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist((set, get) => ({
    items: [],
    total: 0,
    complete_purchase: false,
    appliedCoupons: [], // Track applied coupon codes

    addToCart: (product, quantity = 1) => {
      set((state) => {
        const existingItem = state.items.find((item) => item.id === product.id);
        if (existingItem) {            
          return state;
        } else {
          const newItem = {
            ...product,
            quantity: Math.min(quantity, 8), // Limit to 8
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

        return {
          items: updatedItems,
          total: state.total + (newQuantity - state.items.find((item) => item.id === productId).quantity) * state.items.find((item) => item.id === productId).price,
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
        appliedCoupons: [], // Also clear applied coupons
      });
    },

    setcomplete_purchase: (value) => set({ complete_purchase: value }),

    addDiscount: (product, quantity = 1) => {
      set((state) => {        
        const newItem = {
          ...product,
          quantity: Math.min(quantity, 8), // Limit to 8
        };

        const newItems = [...state.items, newItem];
        return {
          items: newItems,
          total: state.total + newItem.price * newItem.quantity,
        };        
      });
    },
    /*applyCoupon: (couponCode) => {
      set((state) => {
        // Check if the coupon has already been applied
        if (state.appliedCoupons.includes(couponCode)) {
          return state; // Coupon already applied, so do nothing
        }
        const newAppliedCoupons = [...state.appliedCoupons, couponCode];
        return {
          ...state,
          total: calculateTotalWithDiscounts(state.items, newAppliedCoupons),
          appliedCoupons: newAppliedCoupons,
        };
      });
    },*/
  }),
  {
    name: 'cart-storage',
  })
);

/*// Helper function to calculate total with discounts applied
function calculateTotalWithDiscounts(items, appliedCoupons) {
  let total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Apply a fixed discount for each unique coupon applied
  appliedCoupons.forEach(() => {
    total = Math.max(0, total - 499); // Ensure total doesn't go below 0
  });
  
  return total;
}*/

export default useCartStore;
