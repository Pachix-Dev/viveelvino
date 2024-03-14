import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const userRegister = create(
  persist(
    (set) => ({
      name: '',
      email: '',
      phone: '',
      age: '',
      company: '',
      catas: [],
      companions: [],
      completed: false,
      setName: (value) => set({ name: value }),
      setEmail: (value) => set({ email: value }),
      setPhone: (value) => set({ phone: value }),
      setAge: (value) => set({ age: value }),
      setCompany: (value) => set({ company: value }),   
      setCompleted: (value) => set({ completed: value }),
            
      dropState: () => set({
        name: '',
        email: '',
        phone: '',
        age: '',
        company: '',
        catas: [],
        companions: [],
        completed: false,
      }),

      addCata: (cata) =>
        set((state) => {
          let newCatas;
          if (state.catas.length < 1) {
            // If length is less than 3, simply add the new cata
            newCatas = [...state.catas, cata];
          } else {
            // If length is already 3, replace the last item with the new cata
            newCatas = [...state.catas.slice(0, -1), cata];
          }
          return { catas: newCatas };
      }),
           
      addCompanion: (newQuantity) =>{
        if (newQuantity < 1 || newQuantity > 8) { 
          return;
        }
        set((state) => ({
          companions: [...state.companions, { name: '', email: '' }],
        }));
      },

      updateCompanionName: (index, name) =>
        set((state) => ({
          companions: state.companions.map((companion, i) =>
            i === index ? { ...companion, name } : companion
          ),
        })),

      updateCompanionEmail: (index, email) =>
        set((state) => ({
          companions: state.companions.map((companion, i) =>
            i === index ? { ...companion, email } : companion
          ),
        })),

      removeCompanion: () =>
        set((state) => {
          if (state.companions.length > 0) {
            // If there are items in the array, remove the last item
            const newCompanions = [...state.companions.slice(0, -1)];
            return { companions: newCompanions };
          }
          return state;
        }),
        
      dropCompanions: () => set({ companions: [] }),
    }),
    {
      name: 'user-register',
    }
  )
);

export { userRegister };
