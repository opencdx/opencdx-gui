"use client";
import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware'

import { Questionnaire } from '@/generated-api-ts/questionnaire/api';


const useAnfFormStore = create((set) => {
    return {
        formData:  {} ,
        setFormData: (data: any) => {
            set((state: { formData: any; }) => {
                const updatedFormData = { ...state.formData, ...data };
                return { formData: updatedFormData };
            });
        },
        currentQuestionnaire: {} as Questionnaire,
        setCurrentQuestionnaire: (data: Questionnaire) => {
            set((state: { currentQuestionnaire: Questionnaire; }) => ({
                ...state,
                currentQuestionnaire: data
            }));
        },
    };
});


export default useAnfFormStore;
export { useAnfFormStore };
