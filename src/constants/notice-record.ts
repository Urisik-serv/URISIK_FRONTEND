import type { Content } from "../types/notice-list";

export const noticeMap: Record<string, Content> = {
  REVIEW_REMINDER: {
    title: "리뷰를 작성해요",
    content: () => "오늘 먹은 메뉴에 대해 리뷰를 작성해요.",
    icon: "/assets/notice/review-icon.svg",
  },
  MEAL_PLAN_REMINDER: {
    title: "식단을 생성해요",
    content: () => "다음주 식단을 생성할 시간이에요.",
    icon: "/assets/notice/alert-icon.svg",
  },
  TEMPERATURE: {
    title: "우리 가족 식탁 온도",
    content: ({ temp }: { temp: number }) =>
      `가족 식탁 온도 ${temp}° 달성!\n우리 가족의 식탁 온도가 따뜻해져 가고 있어요.`,
    icon: "/assets/notice/review-icon.svg",
  },
} as const;
