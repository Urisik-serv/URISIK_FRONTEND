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
