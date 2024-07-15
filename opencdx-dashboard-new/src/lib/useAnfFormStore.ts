"use client";
import { create } from 'zustand';

const useAnfFormStore = create((set) => {
  return {
    formData: {},
    setFormData: (data: any) => {
      set((state: { formData: any }) => {
        const updatedFormData = { ...state.formData, ...data };

        return { formData: updatedFormData };
      });
    },
  };
});

export default useAnfFormStore;
export { useAnfFormStore };
