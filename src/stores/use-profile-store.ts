import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  isLeader: boolean;
  saveIsLeader: (leader: boolean) => void;
  resetProfile: () => void;
}

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
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
      isLeader: false,
      setSavedFormData: (updater) =>
        set((state) => ({
          savedFormData:
            typeof updater === "function"
              ? updater(state.savedFormData)
              : updater,
        })),
      markLoaded: () => set({ hasLoadedFromServer: true }),
      saveIsLeader: (leader: boolean) => set({ isLeader: leader }),
      resetProfile: () =>
        set({
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
          isLeader: false,
        }),
    }),
    {
      name: "profile-store",
    },
  ),
);

if (typeof window !== "undefined") {
  (window as any).profileStore = useProfileStore;
}
