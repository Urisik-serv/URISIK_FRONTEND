import { useState } from "react";
import ListHeader from "./ListHeader";
import MenuList from "../common/MenuList";

type IngredientsListProps = {
  selectedIndex: number;
};

export default function IngredientsList({
  selectedIndex,
}: IngredientsListProps) {
  const [weekList, setWeekList] = useState<
    { title: string; isOpen: boolean }[]
  >([
    { title: "월요일", isOpen: true },
    { title: "화요일", isOpen: true },
    { title: "수요일", isOpen: true },
    { title: "목요일", isOpen: true },
    { title: "금요일", isOpen: true },
    { title: "토요일", isOpen: true },
    { title: "일요일", isOpen: true },
  ]);
  const toggleWeek = (index: number) => {
    setWeekList((prev) =>
      prev.map((week, idx) =>
        idx === index ? { ...week, isOpen: !week.isOpen } : week,
      ),
    );
  };
  return (
    <div className="flex flex-col gap-4">
      {selectedIndex === 0
        ? weekList.map((week, index) => (
            <div key={week.title}>
              <ListHeader
                toggleable
                title={week.title}
                date="2026.12.29"
                isOpen={week.isOpen}
                setIsOpen={() => toggleWeek(index)}
              />

              {week.isOpen && (
                <div>
                  <p className="font-semibold text-[18px] px-[10px] pt-5 pb-2">
                    코코넛 밀크 파스타
                  </p>
                  <MenuList menu="바나나" />
                </div>
              )}
            </div>
          ))
        : (() => {
            const week = weekList[selectedIndex - 1];

            return (
              <div key={week.title}>
                <ListHeader title={week.title} date="2026.12.29" />

                <p className="font-semibold text-[18px] px-[10px] pt-5 pb-2">
                  코코넛 밀크 파스타
                </p>
                <MenuList menu="바나나" />
              </div>
            );
          })()}
    </div>
  );
}
