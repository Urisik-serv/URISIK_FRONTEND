import { useState } from "react";
import chevronDownIcon from "../../assets/icons/chevron-down-gray.svg";
import chevronUpIcon from "../../assets/icons/chevron-up-gray.svg";
import chevronRightIcon from "../../assets/icons/chevron-right-gray.svg";
import type { Day } from "../../types/meal-plan";

interface DateRangeBlockProps {
  weekStartDate: string;
  days: Day[];
}

export default function DateRangeBlock({
  weekStartDate,
  days,
}: DateRangeBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRangeDate = (dateString: string) => {
    const startDate = new Date(dateString);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.toLocaleDateString("ko-KR").replace(/\.$/, "")}~${endDate.toLocaleDateString("ko-KR").replace(/\.$/, "")}`;
  };

  return (
    <>
      {isOpen ? (
        <div>
          <div className="w-[343px] h-[32px] flex justify-start items-center gap-[8px] px-[10px] py-[4px] rounded-lg bg-secondary-700">
            <button
              onClick={handleOpen}
              className="cursor-pointer flex items-center size-[24px] justify-center"
            >
              <img src={chevronUpIcon} alt="열림" />
            </button>
            <div className="font-semibold text-[16px] tracking-[-0.32px] leading-[24px]">
              {handleRangeDate(weekStartDate)}
            </div>
          </div>
          <div className="flex flex-col gap-[12px] pt-[11px]">
            {days?.map((item) => (
              <div
                key={item.dayOfWeek}
                className="flex justify-between h-[190px]"
              >
                <div className="flex flex-col justify-start">
                  <div className="size-[37px] p-[10px] bg-primary-700 text-white rounded-lg flex items-center justify-center">
                    {item.dayOfWeek}
                  </div>
                </div>
                <div className="w-[294px] border border-primary-700 border-[1.5px] px-[16px] rounded-[18px] flex flex-col gap-[16px] justify-center">
                  {item.meals.map((meal) => (
                    <div key={meal.id}>
                      <div className="flex gap-[14px] ">
                        <div className="size-[66px]  flex-shrink-0 overflow-hidden">
                          <img
                            src={meal.imageUrl}
                            alt={`${meal.title}의 사진`}
                            className="size-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col items-start gap-[6px]">
                          <div className="text-[14px] font-semibold leading-[21px] tracking-[-0.28px]">
                            {meal.title}
                          </div>
                          <div className="text-gray-800 text-[12px] leading-[18px] tracking-[-0.24px]">
                            {meal.ingredients}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-[22px]">
                        <div className="w-[56px] text-[14px] text-gray-800 font-semibold leading-[21px] tracking-[-0.28px] text-center px-[10px]">
                          식재료
                        </div>
                        <div className="w-[184px] text-gray-600 text-[12px] leading-[18px] tracking-[-0.24px]">
                          {meal.ingredients}
                        </div>
                      </div>
                      <div className="flex justify-end gap-0 items-center">
                        <div className="text-gray-800 text-[14px] font-semibold leading-[21px] tracking-[-0.28px]">
                          레시피 자세히 보기
                        </div>
                        <button className="cursor-pointer">
                          <img
                            src={chevronRightIcon}
                            alt="레시시 자세히 보기"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-[343px] h-[32px] flex justify-start items-center gap-[8px] px-[10px] py-[4px] rounded-lg bg-gray-200">
          <button onClick={handleOpen} className="cursor-pointer">
            <img src={chevronDownIcon} alt="닫힘" />
          </button>
          <div className="font-semibold text-gray-600 text-[16px] tracking-[-0.32px] leading-[24px]">
            {handleRangeDate(weekStartDate)}
          </div>
        </div>
      )}
    </>
  );
}
