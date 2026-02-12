import { create } from "zustand";
import type { PostFamilyRoomRequest } from "../types/family-room";
import { persist } from "zustand/middleware";
import type { FamilyRoomResult } from "../types/response";

interface FamilyStore extends PostFamilyRoomRequest {
  familyRoomId: number | null;
  setFamilyData: (data: FamilyRoomResult) => void;
  setFamilyRoomId: (id: number) => void;
  resetFamilyData: () => void;
}

const initialState: PostFamilyRoomRequest & { familyRoomId: number | null } = {
  familyRoomId: null,
  familyComposition: {
    hasMother: true,
    hasFather: true,
    hasGrandFather: false,
    hasGrandMother: false,
    sonCount: 0,
    daughterCount: 0,
  },
  familyPolicy: "MOTHER_ONLY",
};

export const useFamilyStore = create<FamilyStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "family-storage", // 로컬 스토리지에 저장될 키 이름
    },
  ),
);

if (typeof window !== "undefined") {
  (window as any).familyStore = useFamilyStore;
}
