import Button from "../common/Button";
import Up from "../../assets/icons/chevron-up.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuList from "../common/MenuList";
import AlertModal from "../common/AlertModal";

type BottomSheetProps = {
  open: boolean;
};
export default function BottomSheet({ open }: BottomSheetProps) {
  const [tab, setTab] = useState<"common" | "recommend">("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const menus = [
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
    "바나나 프렌치토스트",
  ]; //임시데이터
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  return (
    <div className="w-[375px] fixed bottom-0 p-[10px] rounded-t-2xl shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.25)] overflow-hidden bg-white flex flex-col items-center">
      <div>
        {isModalOpen && (
          <AlertModal
            title=""
            boldContent={`[다음주 식단]에 \n저장되었어요.`}
            mediumContent="식단표로 이동하시겠습니까?"
            buttonText="확인"
            outsideText="탭해서 닫기"
            onButtonClick={() => navigate(`/meal-plan`)}
            onOutsideClick={() => {
              setIsModalOpen(false);
            }}
          />
        )}

        <button
          className="flex items-center justify-center size-8 mb-3 cursor-pointer"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <img src={Up} className="size-8" alt="위로 올리기" />
        </button>
      </div>
      <div className="w-full flex font-semibold text-[18px] h-13">
        <button
          className={`flex-1 cursor-pointer ${tab === "common" ? "bg-gray-50 text-primary-700 " : "bg-white text-gray-300"} ${tab === "common" && isOpen ? "border-b-2 border-primary-700" : ""}`}
          onClick={() => setTab("common")}
        >
          공통
        </button>
        <button
          className={`flex-1 cursor-pointer ${tab === "recommend" ? "bg-gray-50 text-primary-700" : "bg-white text-gray-300"} ${tab === "recommend" && isOpen ? "border-b-2 border-primary-700" : ""}`}
          onClick={() => setTab("recommend")}
        >
          추천
        </button>
      </div>

      <div
        className={`w-full overflow-auto transition-[max-height,opacity,transform] duration-300 ${isOpen ? "max-h-[475px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}
      >
        <div className="py-4">
          {menus.map((menu, idx) => {
            const isMenuListSelect = selected === idx;
            return (
              <MenuList
                key={idx}
                type="profile"
                menu={menu}
                clickable={true}
                isSelected={isMenuListSelect}
                onClick={() => setSelected(idx)}
              />
            );
          })}
        </div>
      </div>

      <div className="p-[10px]">
        <Button
          text={isOpen ? "바꾸기" : "수정완료"}
          type="button"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
            } else {
              setIsModalOpen(true);
            }
          }}
        />
      </div>
    </div>
  );
}
