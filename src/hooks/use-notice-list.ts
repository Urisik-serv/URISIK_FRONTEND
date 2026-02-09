import { useEffect, useState } from "react";
import type { NoticeLists } from "../types/notice-list";
import axios from "axios";
import { getNotificationList } from "../api/notifications";

export const useNoticeList = () => {
  const [noticeList, setNoticeList] = useState<NoticeLists | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<NoticeLists>("/data/notice-list.json");

        const response = await getNotificationList(10);

        setNoticeList(res.data);
        console.log(response); // 실제 api 연동
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  return { noticeList };
};
