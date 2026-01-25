import { useEffect, useState } from "react";
import type { NoticeLists } from "../types/notice-list";
import axios from "axios";

export const useNoticeList = () => {
  const [noticeList, setNoticeList] = useState<NoticeLists | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<NoticeLists>("/data/notice-list.json");

        setNoticeList(res.data);
        console.log(res);
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  return { noticeList };
};
