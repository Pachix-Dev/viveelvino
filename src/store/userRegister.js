import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const userRegister = create(
  persist(
    (set) => ({
      name: '',
      email: '',
      phone: '',      
      catas: [],
      companions: [],
      completed: false,
      setName: (value) => set({ name: value }),
      setEmail: (value) => set({ email: value }),
      setPhone: (value) => set({ phone: value }),      
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

      addCata: (cata, user, date, sala) =>
        set((state) => {
          let newCatas;
          if (state.catas.length < 2) {
            // If length is less than 2, simply add the new cata
            newCatas = [...state.catas, {...cata, user, date, sala}];
          } else {            
            newCatas = [...state.catas.slice(-1, -1), {...cata, user, date, sala}];
          }
          return { catas: newCatas };
      }),
           
      addCompanion: (newQuantity, user) =>{
        if (newQuantity < 1 || newQuantity > 8) { 
          return;
        }
        set((state) => ({
          companions: [...state.companions, { name: '', email: '', user, catas: [] }],
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
        
      updateCompanionCatas: (cata, user, date, sala) =>
        set((state) => {
          const updatedCompanions = state.companions.map((companion) => {
            if (companion.user === user) {
              let newCatas;
              if (companion.catas.length < 2) {
                // If length is less than 2, simply add the new cata
                newCatas = [...companion.catas, { ...cata, date, sala }];
              } else {
                
                newCatas = [...companion.catas.slice(-1, -1), { ...cata, date, sala }];
              }
              return { ...companion, catas: newCatas };
            }
            return companion;
          });
      
          return { companions: updatedCompanions };
      }),
      
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
