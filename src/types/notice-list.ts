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
  direction: "string";
  nullHandling: "string";
  ascending: true;
  property: "string";
  ignoreCase: true;
}

export interface NoticeContent {
  isRead: true;
  type: "REVIEW_REMINDER";
  createdAt: "2026-02-01T09:48:24.874Z";
}

export interface ResponseNoticeDto {
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
