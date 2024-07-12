"use client";
import { create } from 'zustand';
import { Questionnaire } from '@/generated-api-ts/questionnaire/api';

const useAnfFormStore = create((set) => {
    return {
        formData : {},
        setFormData: (data: any) => {
            set((state: { formData: any; }) => {
                const updatedFormData = { ...state.formData, ...data };
                return { formData: updatedFormData };
            });
        },
    };
});


export default useAnfFormStore;
export { useAnfFormStore };
