import { useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import DateRangeBlock from "../../components/mypage/DateRangeBlock";
import GetDateRangeModal from "../../components/mypage/GetDateRangeModal";
import { useQuery } from "@tanstack/react-query";
import { getMonthMealPlan } from "../../api/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import alertImage from "../../assets/images/alert-circle.png";
import SmallButton from "../../components/common/SmallCommonButton";
import type { Week } from "../../types/meal-plan";

export default function History() {
  const familyRoomId = useFamilyStore((state) => state.familyRoomId);
  const [dateRange, setDateRange] = useState("최근 1개월");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: historyData } = useQuery({
    queryKey: ["historyData", familyRoomId, startDate, endDate],
    queryFn: async () => {
      return getMonthMealPlan(familyRoomId as number, startDate, endDate);
    },
    enabled: familyRoomId !== null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDateSelection = (from: string, to: string) => {
    setStartDate(from);
    setEndDate(to);
    setIsOpen(false); // 적용 시 모달 닫기
  };

  return (
    <>
      <PublicHeader title={"기록"} />
      <div className="w-[343px] mx-auto relative">
        <div className="flex justify-start pt-[24px]">
          <div className="text-2xl font-semibold leading-[36px]">
            {dateRange} {dateRange === "최근 1개월" ? "식단기록" : ""}
          </div>
        </div>
        <div className="pt-[16px] flex justify-end">
          <button
            onClick={handleModal}
            className="cursor-pointer w-[70px] p-10px text-center text-white text-[16px] font-medium leading-[16px] tracking-[-0.48px] bg-primary-700 rounded-lg p-[8px]"
          >
            기간조회
          </button>
        </div>
        {(historyData?.weeks?.length ?? 0) > 0 ? (
          <div className="flex flex-col gap-[11px] pt-[8px]">
            {historyData?.weeks.map((history: Week) => (
              <DateRangeBlock
                key={history.mealPlanId}
                weekStartDate={history.weekStartDate}
                days={history.days}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-[11px] pt-30">
            <img src={alertImage} alt="알림 아이콘" className="size-[76px]" />
            <div className="text-center text-[16px] leading-[24px] text-[#4D4D4D]">
              선택한 기간에는
              <br /> 식단 기록이 없어요.
            </div>
            <div className="pt-[24px]">
              <SmallButton
                text={"다른 기간 조회하기"}
                type="button"
                onClick={handleModal}
              />
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <GetDateRangeModal
          handleModal={handleModal}
          onApplyDate={handleDateSelection}
          fromDate={startDate || historyData?.fromDate || ""}
          toDate={endDate || historyData?.toDate || ""}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}
    </>
  );
}
