import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import type { FamilyProfile } from "../types/family-profile";

interface modalActions {
  isOpen: (data: FamilyProfile) => void;
  isClose: () => void;
}
interface modalState {
  open: boolean;
  selectedData: FamilyProfile | null;
  actions: modalActions;
}

export const useProfileModalStore = create(
  immer<modalState>((set, _) => ({
    open: false,
    selectedData: null,
    actions: {
      isOpen: (data: FamilyProfile) => {
        set((state) => {
          state.open = true;
          state.selectedData = data;
        });
      },
      isClose: () => {
        set((state) => {
          state.open = false;
          state.selectedData = null;
        });
      },
    },
  })),
);

export const useProfileModalInfo = () =>
  useProfileModalStore(
    useShallow((state) => ({
      open: state.open,
      selectedData: state.selectedData,
    })),
  );

export const useProfileModalActions = () =>
  useProfileModalStore((state) => state.actions);
