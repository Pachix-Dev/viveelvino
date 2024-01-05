import { create } from 'zustand';

const useCartStore = create((set) => ({
  items: [],
  total: 0,

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
}));

export default useCartStore;
