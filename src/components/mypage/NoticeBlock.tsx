import noticeIcon from "../../assets/icons/notice-icon.png";
import reviewIcon from "../../assets/icons/review-icon.png";

interface NoticeBlockProps {
  title: string;
  content: string;
  icon: string;
  date: string;
}

export default function NoticeBlock({
  title,
  content,
  icon,
  date,
}: NoticeBlockProps) {
  if (icon === "notice") {
    icon = noticeIcon;
  } else if (icon === "review") {
    icon = reviewIcon;
  }

  const getRelativeTime = (dateString: string) => {
    const now = new Date("2026-01-24T17:00:00");
    const targetDate = new Date(dateString);
    const diffInMinutes = Math.floor(
      (now.getTime() - targetDate.getTime()) / (1000 * 60),
    );
    const diffInDays = now.getDate() - targetDate.getDate();

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분전`;
    } else if (diffInMinutes < 1440 && diffInDays === 0) {
      const hour = Math.floor(diffInMinutes / 60);
      return `${hour}시간전`;
    } else if (diffInDays == 1 && diffInMinutes < 2880) {
      return `어제`;
    } else {
      return `${targetDate.getMonth() + 1}.${targetDate.getDate()}`;
    }
  };

  return (
    <div className="w-full py-[16px] px-[20px] flex justify-between bg-gray-50 rounded-xl">
      <div className="flex items-start h-full">
        <img src={icon} alt="icon" className="size-[26px]" />
      </div>
      <div className="flex flex gap-[12px]">
        <div className="flex flex-col gap-[10px] items-start w-[213px]">
          <div className="text-gray-500 text-center text-[14px] font-medium leading-[22.26px]">
            {title}
          </div>
          <div className="text-gray-800 text-[16px] font-semibold leading-[24px] ">
            {content}
          </div>
        </div>
        <div className="h-full flex items-start">
          <div className="w-[33px] text-center text-gray-400 text-[14px] font-medium leading-[22.26px]">
            {getRelativeTime(date)}
          </div>
        </div>
      </div>
    </div>
  );
}
