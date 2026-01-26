import blackCalender from "../../assets/icons/calendar-black.svg";

interface DateProps {
  date: string;
}

export default function DateBlock({ date }: DateProps) {
  return (
    <div className="w-[153.5px] px-[16px] py-[12px] border border-gray-300 bg-gray-50 rounded-lg flex justify-start gap-[12px]">
      <div className="size-[18px] flex justify-center items-center">
        <img src={blackCalender} alt="달력" />
      </div>
      <div className="text-[14px] leading-[21px]">{date}</div>
    </div>
  );
}
