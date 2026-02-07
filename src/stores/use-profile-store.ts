// use-profile-store.ts
import { create } from "zustand";

export interface FamilyProfileFormData {
  nickname: string;
  role: string;
  allergies: string[] | boolean;
  preferences: string[];
  likedIngredients?: string;
  dislikedIngredients?: string;
  profilePicUrl?: string;
}

interface ProfileStore {
  savedFormData: FamilyProfileFormData;
  hasLoadedFromServer: boolean;
  setSavedFormData: (
    updater:
      | FamilyProfileFormData
      | ((prev: FamilyProfileFormData) => FamilyProfileFormData),
  ) => void;
  markLoaded: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  savedFormData: {
    nickname: "",
    role: "",
    allergies: [],
    preferences: [],
    likedIngredients: "",
    dislikedIngredients: "",
    profilePicUrl: "",
  },
  hasLoadedFromServer: false,
  setSavedFormData: (updater) =>
    set((state) => ({
      savedFormData:
        typeof updater === "function" ? updater(state.savedFormData) : updater,
    })),
  markLoaded: () => set({ hasLoadedFromServer: true }),
}));

if (typeof window !== "undefined") {
  (window as any).profileStore = useProfileStore;
}
