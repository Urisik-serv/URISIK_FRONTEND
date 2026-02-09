interface NoticeBlockProps {
  title: string;
  content: string;
  icon: string;
  ago: string;
  isRead: boolean;
}

export default function NoticeBlock({
  title,
  content,
  icon,
  ago,
  isRead,
}: NoticeBlockProps) {
  return (
    <div className="w-full py-[16px] px-[20px] flex justify-start gap-4 bg-gray-50 rounded-xl">
      <div className="flex items-start h-full">
        <img src={icon} alt="icon" className="size-[26px]" />
      </div>
      <div className="flex flex-col gap-[10px] flex-1">
        <div className="flex justify-between">
          <div className="text-gray-500 text-center text-[14px] font-medium leading-[22.26px]">
            {title}
          </div>
          <div className="flex gap-2">
            <div className="text-center text-gray-400 text-[14px] font-medium leading-[22.26px]">
              {ago}
            </div>
            {!isRead && <div className="size-2 rounded-full bg-primary-700" />}
          </div>
        </div>
        <div className="text-gray-800 text-[16px] font-semibold leading-[24px] ">
          {content}
        </div>
      </div>
    </div>
  );
}
