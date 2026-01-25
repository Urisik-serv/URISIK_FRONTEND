import { useState } from "react";
import type { DailyRecord } from "../../types/history-data";
import chevronDownIcon from "../../assets/icons/chevron-down-gray.svg";
import chevronUpIcon from "../../assets/icons/chevron-up-gray.svg";

interface DateRangeBlockProps {
  startDate: string;
  updateDate: string;
  dailyRecords?: DailyRecord[];
}

export default function DateRangeBlock({
  startDate,
  updateDate,
  dailyRecords,
}: DateRangeBlockProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleRangeDate = (dateString: string) => {
    const startDate = new Date(dateString);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return `${startDate.toLocaleDateString("ko-KR")}~${endDate.toLocaleDateString("ko-KR")}`;
  };

  const handleUpdateDate = (dateString: string) => {
    const updateDate = new Date(dateString);
    return `${updateDate.toLocaleDateString("ko-KR")}`;
  };

  return (
    <>
      {isOpen ? (
        <div className="">
          <div className="w-[343px] h-[32px] flex justiry-start items-center gap-[8px] px-[10px] py-[4px] rounded-lg bg-secondary-700">
            <img src={chevronUpIcon} alt="열림" />
            <div className="font-semibold text-[16px] tracking-[-0.32px] leading-[24px]">
              {handleRangeDate(startDate)}
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <div>{}</div>
            <div></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
