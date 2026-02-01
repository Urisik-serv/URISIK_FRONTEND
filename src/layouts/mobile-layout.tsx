import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import UpButton from "../components/common/UpButton";
import AlertModal from "../components/common/AlertModal";
import { useEffect, useRef } from "react";
import {
  usePopupTimerActions,
  usePopupTimerStore,
} from "../hooks/use-popup-timer-store";

export default function MobileLayout() {
  const location = useLocation();
  const footerPaths = ["/", "/meal-plan"];

  const showFooter = footerPaths.includes(location.pathname);

  const { openPopup, closePopup } = usePopupTimerActions();
  const { isPopup, deadline } = usePopupTimerStore();
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeoutRef.current !== null) {
      //타이머가 있는 경우 초기화
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (deadline == null) return; //타이머가 없는 경우

    const time = deadline - Date.now();

    if (time <= 0) {
      //시간이 지난 경우
      openPopup();
      return;
    }

    timeoutRef.current = window.setTimeout(() => {
      openPopup();
      timeoutRef.current = null;
    }, time); //time만큼 기다렸다가 실행

    return () => {
      // 남은 타이머 제거
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [deadline, openPopup]);

  const handleButton = () => {
    closePopup();
    navigate(`/meal-plan/ingredients`);
  };

  return (
    <div className="flex min-h-[100dvh] justify-center bg-gray-50">
      <div className="relative w-full max-w-[375px] bg-white shadow-md">
        <Outlet />
        {showFooter && <Footer />}
        <UpButton />
        {isPopup && (
          <AlertModal
            title=""
            boldContent={`식단표를 반영한\n3인분 식재료를 정리했어요.`}
            mediumContent="식재료 리스트로 이동하시겠어요?"
            buttonText="확인"
            outsideText="탭해서 닫기"
            onClick={handleButton}
            handleModal={closePopup}
          />
        )}
      </div>
    </div>
  );
}
