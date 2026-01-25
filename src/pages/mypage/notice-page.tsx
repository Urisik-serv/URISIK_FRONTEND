import PublicHeader from "../../components/header/PublicHeader";
import NoticeBlock from "../../components/mypage/NoticeBlock";
import { useNoticeList } from "../../hooks/use-notice-list";

export default function NoticePage() {
  const noticeList = useNoticeList();
  return (
    <>
      <PublicHeader title={"알림 내용"} />
      <div className="pt-[66px] flex flex-col items-center mx-auto gap-[12px] w-[343px]">
        {noticeList.noticeList?.notices.map((notice) => (
          <NoticeBlock
            key={notice.id}
            icon={notice.icon}
            title={notice.title}
            date={notice.created_at}
            content={notice.content}
          />
        ))}
      </div>
    </>
  );
}
