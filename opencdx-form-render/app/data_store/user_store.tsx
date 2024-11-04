import { create } from "zustand";
import { UserProfile } from "~/api/health";
interface UserStore {
    userProfile: UserProfile | undefined;
    setUserProfile: (profile: UserProfile) => void;
    updateUserStore: (updates: Partial<UserProfile>) => void;
    clearUserProfile: () => void;
}

const useUserStore = create<UserStore>((set) => ({
    userProfile: undefined,
    
    // Set the entire user profile
    setUserProfile: (profile: UserProfile) => set({ userProfile: profile }),
  
    // Update only the specified properties of the user profile
    updateUserStore: (updates: Partial<UserProfile>) => 
      set((state) => ({
        userProfile: { ...state.userProfile, ...updates },
      })),
  
    // Clear the user profile
    clearUserProfile: () => set({ userProfile: undefined }),
  }));
  
  export default useUserStore;
  