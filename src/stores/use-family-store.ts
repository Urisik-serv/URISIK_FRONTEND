import { create } from "zustand";
import type { PostFamilyRoomRequest } from "../types/family-room";

interface FamilyStore extends PostFamilyRoomRequest {
  familyRoomId: number | null;
  setFamilyData: (data: Partial<PostFamilyRoomRequest>) => void;
  setFamilyRoomId: (id: number) => void;
  resetFamilyData: () => void;
}

const initialState: PostFamilyRoomRequest & { familyRoomId: number | null } = {
  familyRoomId: null,
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

  setFamilyRoomId: (id) => set({ familyRoomId: id }),

  resetFamilyData: () =>
    set((state) => ({
      ...state,
      ...initialState,
    })),
}));
