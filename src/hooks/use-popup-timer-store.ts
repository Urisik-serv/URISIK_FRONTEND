//식단을 저장했을 때 1분 후에 식재료 알람 모달을 띄우기 위한 타이머 입니다.

import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { useShallow } from "zustand/shallow";

interface popupActions {
  setTimer: () => void;
  openPopup: () => void;
  closePopup: () => void;
}

interface popupState {
  deadline: number | null;
  isPopup: boolean;
  actions: popupActions;
}

export const usePopupTimerStore = create<popupState>()(
  immer((set, _) => ({
    deadline: null,
    isPopup: false,
    actions: {
      setTimer: () => {
        set((state) => {
          const now = Date.now();
          state.deadline = now + 60_000; //현재 시간으로부터 1분 후
        });
      },
      openPopup: () => {
        set((state) => {
          state.isPopup = true;
          state.deadline = null;
        });
      },
      closePopup: () => {
        set((state) => {
          state.isPopup = false;
        });
      },
    },
  })),
);

export const usePopupTimerInfo = () =>
  usePopupTimerStore(
    useShallow((state) => ({
      deadline: state.deadline,
      isPopup: state.isPopup,
    })),
  );

export const usePopupTimerActions = () =>
  usePopupTimerStore((state) => state.actions);
