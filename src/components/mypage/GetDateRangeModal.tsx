import xIcon from "../../assets/icons/x-icon-gray500.svg";
import dropDownButton from "../../assets/icons/chevron-down-gray.svg";
import Button from "../common/Button";
import DateBlock from "./DateBlock";
import { useState } from "react";

interface ModalProps {
  handleModal: () => void;
  fromDate: string;
  toDate: string;
}

export default function GetDateRangeModal({
  handleModal,
  fromDate,
  toDate,
}: ModalProps) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [dateRange, setDateRange] = useState("최근 1개월");

  const handleDropDown = () => {
    setIsOpenDropDown((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div className="relative w-full max-w-[375px] h-full flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/50" onClick={handleModal} />

        <div className="relative w-full flex flex-col bg-white py-[17px] px-[16px] rounded-t-3xl">
          <div className="flex justify-center pb-[24px]">
            <button onClick={handleModal} className="cursor-pointer">
              <img src={xIcon} alt="닫기" />
            </button>
          </div>

          <div className="pb-[24px] text-xl font-semibold">기간 조회</div>

          <div className="flex flex-col relative">
            <button
              onClick={handleDropDown}
              className="cursor-pointer w-full p-[12px] flex justify-between items-center border border-gray-300 rounded-lg"
            >
              <span className="text-[16px]">{dateRange}</span>
              <img src={dropDownButton} alt="열기" className="size-[24px]" />
            </button>
            {isOpenDropDown && (
              <div className="absolute top-full left-0 w-full z-50 bg-white border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <button
                  onClick={() => {
                    setDateRange("최근 1개월");
                    setIsOpenDropDown(false);
                  }}
                  className="w-full p-[12px] text-left hover:bg-gray-100 cursor-pointer"
                >
                  최근 1개월
                </button>
                <div className="h-[1px] w-full bg-gray-300" />
                <button
                  onClick={() => {
                    setDateRange("직접 선택");
                    setIsOpenDropDown(false);
                  }}
                  className="w-full p-[12px] text-left hover:bg-gray-100 cursor-pointer"
                >
                  직접 선택
                </button>
              </div>
            )}
          </div>

          <div className="pt-[16px] flex justify-between gap-[12px]">
            <DateBlock date={fromDate} />
            <span className="flex items-center text-[18px]">~</span>
            <DateBlock date={toDate} />
          </div>

          <div className="pt-[25px]">
            <Button text={"적용"} type="button" onClick={handleModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
