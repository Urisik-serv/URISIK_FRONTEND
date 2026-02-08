import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface categoryActions {
  select: (name: string) => void;
}
interface categoryState {
  selectedData: string;
  actions: categoryActions;
}

export const useSelectCategoryStore = create(
  immer<categoryState>((set, _) => ({
    selectedData: "",
    actions: {
      select: (name) => {
        set((state) => {
          state.selectedData = name;
        });
      },
    },
  })),
);

export const useSelectedCategoryInfo = () => {
  useSelectCategoryStore(
    useShallow((state) => ({
      selectedCategory: state.selectedData,
    })),
  );
};

export const useSelectedCategoryActions = () =>
  useSelectCategoryStore((state) => state.actions);
