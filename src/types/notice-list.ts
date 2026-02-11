import type { BaseResponse } from "./response";

export interface Notice {
  id: number;
  title: string;
  content: string;
  created_at: string;
  icon: string;
}

export interface NoticeLists {
  notices: Notice[];
}

export interface NoticeSort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface NoticeContent {
  isRead: boolean;
  type: "REVIEW_REMINDER" | "MEAL_PLAN_REMINDER" | "TEMPERATURE";
  createdAt: string;
  mealPlanGenerationCount: number | null;
}

export interface Content {
  icon: string;
  title: string;
  content: (params?: any) => string;
}

export interface NoticeResult {
  pageable: {
    paged: true;
    pageNumber: 0;
    pageSize: 0;
    offset: 0;
    sort: NoticeSort[];
    unpaged: true;
  };
  first: boolean;
  size: number;
  content: NoticeContent[];
  number: number;
  sort: NoticeSort[];
  numberOfElements: number;
  last: boolean;
  empty: boolean;
}

export interface IsRead {
  isRead: boolean;
}

export interface TimeOut {
  timeout: number;
}

// 알림 목록 조회
export type ResponseNotice = BaseResponse<NoticeResult>;
// 알림 읽음 처리
export type ResponseIsRead = BaseResponse<IsRead>;
// 알림용 SSE 연결
export type ResponseSSE = BaseResponse<TimeOut>;
