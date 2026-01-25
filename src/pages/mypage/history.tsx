import PublicHeader from "../../components/header/PublicHeader";
import DateRangeBlock from "../../components/mypage/DateRangeBlock";
import { useHistoryData } from "../../hooks/use-history-data";

export default function History() {
  const { historyData } = useHistoryData();

  return (
    <>
      <PublicHeader title={"기록"} />
      <div className="w-[343px] mx-auto">
        <div className="flex justify-start pt-[24px]">
          <div className="text-2xl font-semibold leading-[36px]">
            최근 1개월 식단 기록
          </div>
        </div>
        <div className="pt-[16px] flex justify-end">
          <button className="cursor-pointer w-[70px] p-10px text-center text-white text-[16px] font-medium leading-[16px] tracking-[-0.48px] bg-primary-700 rounded-lg p-[8px]">
            기간조회
          </button>
        </div>
        <div className="flex flex-col gap-[11px]">
          {historyData?.history?.map((history) => (
            <DateRangeBlock
              key={history.id}
              startDate={history.started_at}
              updateDate={history.updated_at}
              dailyRecords={history.daily_records}
            />
          ))}
        </div>
      </div>
    </>
  );
}
