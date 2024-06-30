import { create } from 'zustand';

const useAnfFormStore = create((set) => {
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
        isListOpen: true,
        setIsListOpen: (isOpen) => set(() => ({ isListOpen: isOpen }))
    };
});

export default useAnfFormStore;
export { useAnfFormStore };
