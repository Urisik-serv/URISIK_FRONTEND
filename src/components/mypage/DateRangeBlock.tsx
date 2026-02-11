import { useState } from "react";
import chevronDownIcon from "../../assets/icons/chevron-down-gray.svg";
import chevronUpIcon from "../../assets/icons/chevron-up-gray.svg";
import type { Day } from "../../types/meal-plan";
import { useNavigate } from "react-router-dom";
import Right from "../../assets/icons/chevron-right-gray.svg";
import { dayOfWeekMap } from "../../constants/date-rerord";

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

  const navigate = useNavigate();

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
              <div key={item.dayOfWeek} className="flex justify-between">
                <div className="flex flex-col justify-start">
                  <div className="size-[37px] p-[10px] bg-primary-700 text-white rounded-lg flex items-center justify-center">
                    {dayOfWeekMap[item.dayOfWeek]}
                  </div>
                </div>
                <div className="w-[294px] border border-primary-700 border-[1.5px] px-[16px]  rounded-[18px] flex flex-col gap-[16px] justify-center">
                  {item.meals.map((meal) => (
                    <div className="flex flex-col gap-4 py-4">
                      <div className="flex gap-[14px]">
                        <img
                          src={meal.imageUrl}
                          alt="음식 이미지"
                          className="size-[66px] rounded-lg object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between gap-1.5">
                          <p className="font-semibold text-[14px] tracking-[-0.02em] text-gray-800">
                            {meal.title}
                          </p>
                          <p className="font-normal text-[12px] text-gray-800 leading-[18px]">
                            {meal.ingredients}
                          </p>
                          <div className="flex justify-end pt-1.5">
                            <button
                              className="flex items-center font-semibold cursor-pointer text-[14px] text-gray-800"
                              onClick={() =>
                                navigate(`/menu-information/${meal.id}`)
                              }
                            >
                              레시피 자세히 보기
                              <img src={Right} alt="화살표 아이콘" />
                            </button>
                          </div>
                        </div>
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
