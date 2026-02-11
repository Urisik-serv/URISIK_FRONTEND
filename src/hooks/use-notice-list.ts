import { getNotificationList } from "../api/notifications";
import { useQuery } from "@tanstack/react-query";
import { noticeMap } from "../constants/notice-record";
import { useState } from "react";
import type { ResponseNotice } from "../types/notice-list";

export const useNoticeList = () => {
  const [size, setSize] = useState(10);

  const { data, isFetching } = useQuery<ResponseNotice>({
    queryKey: ["notice", size],
    queryFn: () => getNotificationList(size),
    placeholderData: (previousData) => previousData,
  });

  const ago = (createdAt: string) => {
    const now = new Date();
    const target = new Date(createdAt);

    const diffMs = now.getTime() - target.getTime();
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const targetDate = new Date(
      target.getFullYear(),
      target.getMonth(),
      target.getDate(),
    );
    const diffDays = Math.floor(
      (nowDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffSeconds < 60) {
      return "방금 전";
    }

    if (diffMinutes < 60) {
      return `${diffMinutes}분 전`;
    }

    if (diffHours < 24 && diffDays === 0) {
      return `${diffHours}시간 전`;
    }

    if (diffDays === 1) {
      return "어제";
    }

    return `${diffDays}일 전`;
  };

  const getTemp = (mealPlanCount: number) => {
    if (mealPlanCount === 5) {
      return "25°C";
    } else if (mealPlanCount === 6) {
      return "50°C";
    } else if (mealPlanCount === 10) {
      return "100°C";
    }
  };

  let generation;
  const noticeList = data?.result.content.map((item) => {
    let content;
    if (item.type === "TEMPERATURE" && item.mealPlanGenerationCount !== null) {
      const temp = getTemp(item.mealPlanGenerationCount);
      generation = item.mealPlanGenerationCount;
      content = noticeMap[item.type].content(temp);
    } else {
      content = noticeMap[item.type].content();
    }

    return {
      icon: noticeMap[item.type].icon,
      title: noticeMap[item.type].title,
      content: content,
      ago: ago(item.createdAt),
      isRead: item.isRead,
      key: crypto.randomUUID(),
      id: crypto.randomUUID(),
    };
  });

  return { noticeList, generation, isFetching, data, setSize };
};
