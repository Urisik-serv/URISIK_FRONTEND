import PublicHeader from "../../components/header/PublicHeader";
import NoticeBlock from "../../components/mypage/NoticeBlock";
import { useNoticeList } from "../../hooks/use-notice-list";

export default function NoticePage() {
  const noticeList = useNoticeList();

  return (
    <>
      <PublicHeader title={"알림 내용"} />
      <div className="pt-[24px] flex flex-col items-center mx-auto gap-[12px] w-[343px]">
        {noticeList?.map((item) => (
          <NoticeBlock
            key={item.key}
            title={item.title}
            content={item.content}
            icon={item.icon}
            ago={item.ago}
            isRead={item.isRead}
          />
        ))}
      </div>
    </>
  );
}
