import { useEffect, useRef, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import CalendarChipM from "../../components/meal-plan/CalendarChip/CalendarChipM";
import MenuChip from "../../components/meal-plan/MenuChip";
import BottomSheet from "../../components/meal-plan/BottomSheet";

const MealPlanEditPage = () => {
  const data = [
    { day: "월", menus: ["바나나", "김밥"] },
    { day: "화", menus: ["귤", "김밥", "김밥"] },
    { day: "수", menus: ["귤", "김밥", "김밥"] },
    { day: "목", menus: ["귤"] },
    { day: "금", menus: ["김밥"] },
    { day: "토", menus: ["귤", "김밥", "김밥"] },
    { day: "일", menus: ["귤", "김밥"] },
  ]; //임시 데이터
  const [selected, setSelected] = useState<{
    dayIndex: number | null;
    menuIndex: number | null;
  }>({ dayIndex: null, menuIndex: null });
  const [open, setOpen] = useState(false);

  const hasOpenedRef = useRef(false);
  useEffect(() => {
    if (selected.menuIndex !== null && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <div>
      <PublicHeader title={""} />
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-4 whitespace-pre-line">
        수정하고 싶은 요일을 선택하고,{"\n"}내가 원하는 메뉴로 바꿔요.
      </p>
      <div className="flex gap-2 pt-2 px-4 overflow-x-auto">
        {data.map((data, dayIndex) => {
          const isDaySelected = selected.dayIndex === dayIndex;
          return (
            <div className="flex flex-col items-center gap-3">
              <CalendarChipM text={data.day} isSelect={isDaySelected} />
              {data.menus.map((menu, menuIndex) => {
                const isMenuSelected =
                  selected.menuIndex === menuIndex &&
                  selected.dayIndex === dayIndex;
                return (
                  <MenuChip
                    text={menu}
                    clickable={true}
                    isSelect={isMenuSelected}
                    onClick={() => {
                      const isAlreadySelected =
                        selected.menuIndex === menuIndex &&
                        selected.dayIndex === dayIndex;
                      if (isAlreadySelected) {
                        //선택된 메뉴를 다시 누르는 경우
                        setSelected({ dayIndex: null, menuIndex: null });
                      } else {
                        setSelected({ dayIndex, menuIndex });
                      }
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <BottomSheet open={open} />
    </div>
  );
};

export default MealPlanEditPage;
