import xIcon from "../../assets/icons/x-icon-gray500.svg";
import Button from "../common/Button";
import DateBlock from "./DateBlock";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "../../styles/dayPicker.css";
import Chevron from "../common/icon/Chevron";
import toast from "react-hot-toast";

interface ModalProps {
  handleModal: () => void;
  onApplyDate: (from: string, to: string) => void;
  fromDate: string;
  toDate: string;
  setDateRange: (text: string) => void;
  dateRange: string;
}

export default function GetDateRangeModal({
  handleModal,
  onApplyDate,
  fromDate,
  toDate,
  setDateRange,
  dateRange,
}: ModalProps) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const [from, setFrom] = useState(fromDate);
  const [to, setTo] = useState(toDate);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  };

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);

    if (!selected?.from || !selected?.to) return;

    setFrom(formatDate(selected.from));
    setTo(formatDate(selected.to));
  };

  const handleFinalApply = () => {
    onApplyDate(from, to);
  };

  const handleDropDown = () => {
    setIsOpenDropDown((prev) => !prev);
  };

  const handleApplyDate = () => {
    if (!range?.from || !range?.to) {
      toast.error("기간을 모두 선택해주세요.");
      return;
    }

    const fromDay = range.from.getDay();
    const toDay = range.to.getDay();

    if (fromDay !== 1) {
      toast.error("시작 날짜는 월요일이어야 합니다.");
      return;
    }

    if (toDay !== 0) {
      toast.error("종료 날짜는 일요일이어야 합니다.");
      return;
    }

    const formattedFrom = formatDate(range.from);
    const formattedTo = formatDate(range.to);

    setFrom(formattedFrom);
    setTo(formattedTo);

    setDateRange(`${formattedFrom} ~ ${formattedTo}`);
    setCalendarOpen(false);
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
              <Chevron color="#71717A" />
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
                    setIsOpenDropDown(false);
                    setCalendarOpen(true);
                  }}
                  className="w-full p-[12px] text-left hover:bg-gray-100 cursor-pointer"
                >
                  직접 선택
                </button>
              </div>
            )}
          </div>

          <div className="pt-[16px] flex justify-between gap-[12px]">
            <DateBlock date={from} />
            <span className="flex items-center text-[18px]">~</span>
            <DateBlock date={to} />
          </div>
          <div className="pt-[25px]">
            <Button text={"적용"} type="button" onClick={handleFinalApply} />
          </div>
        </div>
      </div>
      {calendarOpen && (
        <div
          onClick={() => setCalendarOpen(false)}
          className="fixed inset-0 flex justify-center items-end z-50"
        >
          <div className="flex flex-col w-full max-w-[375px]  bg-white rounded-t-3xl px-4 pt-4 pb-6 flex justify-center items-center">
            <DayPicker
              weekStartsOn={1}
              mode="range"
              selected={range}
              onSelect={handleSelect}
            />
            <div className="pt-4">
              <Button text="선택" type="button" onClick={handleApplyDate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
