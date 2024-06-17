"use client";
import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware'

import { Questionnaire } from '@/config/interface'


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
// const useAnfFormStore = create(persist(
//     create((set) => ({
//         formData: {},
//         setFormData: (data: any) => {
//             set((state: { formData: any; }) => ({
//                 formData: { ...state.formData, ...data }
//             }));
//         },
//         currentQuestionnaire: {} as Questionnaire,
//         setCurrentQuestionnaire: (data: Questionnaire) => {
//             set((state: { currentQuestionnaire: Questionnaire; }) => ({
//                 ...state,
//                 currentQuestionnaire: data
//             }));
//         },
//     })),
//     {
//         name: 'questionnaire-store',
//         storage: createJSONStorage(() => sessionStorage
//         ),}
// ));

export default useAnfFormStore;
export { useAnfFormStore };
