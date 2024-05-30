import { create } from 'zustand';

const useAnfFormStore = create((set) => {
    // const files = JSON.parse(localStorage.getItem('anf-form'));
    return {
        formData: {},
        setFormData: (data) => {
            set((state) => ({
                formData: { ...state.formData, ...data }
            }));
        },
        uploadData: {},
        setUploadData: (data) => {
            set((state) => ({
                uploadData: { ...state.uploadData, ...data }
            }));
        },
        anfData: {},
        setAnfData: (data) => {
            set((state) => ({
                anfData: { ...state.anfData, ...data }
            }));
        },
    };
});

export default useAnfFormStore;
export { useAnfFormStore };
