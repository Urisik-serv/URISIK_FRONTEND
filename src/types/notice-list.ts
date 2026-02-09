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

export interface ResponseNotice {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
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
  };
  errorDetail: {};
}

export interface Content {
  icon: string;
  title: string;
  content: (params?: any) => string;
}
