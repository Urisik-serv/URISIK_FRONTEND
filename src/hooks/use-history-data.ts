import { useEffect, useState } from "react";
import type { Histories } from "../types/history-data";
import axios from "axios";

export const useHistoryData = () => {
  const [historyData, setHistoryData] = useState<Histories | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Histories>("/data/history-data.json");
        setHistoryData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("데이터 로딩 실패:", error);
      }
    };
    fetchData();
  }, []);

  return { historyData };
};
