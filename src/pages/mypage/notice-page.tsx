import { useEffect, useRef } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import NoticeBlock from "../../components/mypage/NoticeBlock";
import { useNoticeList } from "../../hooks/use-notice-list";
import NotificationSkeleton from "../../components/mypage/NotificationSkeleton";

export default function NoticePage() {
  const { noticeList, isFetching, data, setSize } = useNoticeList();
  const observerRef = useRef<HTMLDivElement | null>(null);
  // api 수정이 완료되면 주석 삭제하겠습니다

  // const { mutate: readNotification } = useReadNotification();

  // useEffect(() => {
  //   if (!noticeList) return;

  //   noticeList
  //     .filter((item) => !item.isRead)
  //     .forEach((item) => {
  //       readNotification(item.key);
  //     });
  // }, [noticeList]);

  useEffect(() => {
    if (!observerRef.current || data?.result.last) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetching) {
          setSize((prev) => prev + 10);
        }
      },
      { threshold: 1 },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [isFetching, data?.result.last]);

  return (
    <>
      <PublicHeader title={"알림 내용"} />
      <div className="pt-[24px] flex flex-col items-center mx-auto gap-[12px] w-[343px]">
        {noticeList?.map(
          (item: {
            icon: string;
            title: string;
            content: string;
            ago: string;
            isRead: boolean;
            key: number;
          }) => (
            <NoticeBlock
              key={item.key}
              title={item.title}
              content={item.content}
              icon={item.icon}
              ago={item.ago}
              isRead={item.isRead}
            />
          ),
        )}
        <div ref={observerRef} className="h-1" />

        {isFetching &&
          data?.result.last &&
          Array.from({ length: 3 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
      </div>
    </>
  );
}
