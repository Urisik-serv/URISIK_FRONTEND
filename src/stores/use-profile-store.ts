// use-profile-store.ts
import { create } from "zustand";

export interface FamilyProfileFormData {
  nickname: string;
  role: string;
  allergies: string[] | boolean;
  preferences: string[];
  likedIngredients?: string;
  dislikedIngredients?: string;
}

interface ProfileStore {
  savedFormData: FamilyProfileFormData;
  setSavedFormData: (
    updater:
      | FamilyProfileFormData
      | ((prev: FamilyProfileFormData) => FamilyProfileFormData),
  ) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  savedFormData: {
    nickname: "",
    role: "",
    allergies: [],
    preferences: [],
    likedIngredients: "",
    dislikedIngredients: "",
  },
  setSavedFormData: (updater) =>
    set((state) => ({
      savedFormData:
        typeof updater === "function" ? updater(state.savedFormData) : updater,
    })),
}));
