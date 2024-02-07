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
      companions: [],
      completed: false,
      setName: (value) => set({ name: value }),
      setEmail: (value) => set({ email: value }),
      setPhone: (value) => set({ phone: value }),
      setAge: (value) => set({ age: value }),
      setCompany: (value) => set({ company: value }),
      setCompleted: (value) => set({ completed: value }),
      
      // Function to drop the entire state
      dropState: () => set({
        name: '',
        email: '',
        phone: '',
        age: '',
        company: '',
        companions: [],
        completed: false,
      }),

      addCompanion: () =>
        set((state) => ({
          companions: [...state.companions, { name: '', email: '' }],
        })),
      updateCompanion: (index, companionData) =>
        set((state) => ({
          companions: state.companions.map((companion, i) =>
            i === index ? { ...companion, ...companionData } : companion
          ),
        })),
      removeCompanion: (index) =>
        set((state) => ({
          companions: state.companions.filter((_, i) => i !== index),
        })),
    }),
    {
      name: 'user-register',
    }
  )
);

export { userRegister };
