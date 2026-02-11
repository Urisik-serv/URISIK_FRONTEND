import { create } from "zustand";
import { persist } from "zustand/middleware";
import { rolePicture } from "../constants/profile-record";

export interface FamilyProfileFormData {
  nickname: string;
  role: string;
  allergies: string[];
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

const defaultFormData: FamilyProfileFormData = {
  nickname: "",
  role: "",
  allergies: [],
  preferences: [],
  likedIngredients: "",
  dislikedIngredients: "",
  profilePicUrl: rolePicture["MOM"],
};

export const useProfileStore = create(
  persist<ProfileStore>(
    (set) => ({
      savedFormData: defaultFormData,
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
          savedFormData: defaultFormData,
          hasLoadedFromServer: false,
          isLeader: false,
        }),
    }),
    {
      name: "profile-store",
      version: 2,

      migrate: (persistedState: any) => {
        const state = persistedState ?? {};

        return {
          ...state,
          savedFormData: {
            ...defaultFormData,
            ...state.savedFormData,
            preferences: state.savedFormData?.preferences ?? [],
            allergies: state.savedFormData?.allergies ?? [],
            profilePicUrl:
              state.savedFormData?.profilePicUrl || rolePicture["MOM"],
          },
        };
      },
    },
  ),
);

if (typeof window !== "undefined") {
  (window as any).profileStore = useProfileStore;
}
