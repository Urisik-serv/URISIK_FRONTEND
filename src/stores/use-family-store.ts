import { create } from "zustand";
import type { PostFamilyRoomRequest } from "../types/family-room";

interface FamilyStore extends PostFamilyRoomRequest {
  setFamilyData: (data: Partial<PostFamilyRoomRequest>) => void;
  resetFamilyData: () => void;
}

const initialState: PostFamilyRoomRequest = {
  familySize: 0,
  familyComposition: {
    hasMother: true,
    hasFather: true,
    sonCount: 0,
    daughterCount: 0,
  },
  familyPolicy: "MOTHER_ONLY",
};

export const useFamilyStore = create<FamilyStore>((set) => ({
  ...initialState,

  setFamilyData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  resetFamilyData: () => set(initialState),
}));
