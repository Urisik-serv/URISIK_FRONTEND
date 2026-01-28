export interface Histories {
  history: History[];
}

interface History {
  id: number;
  started_at: string;
  updated_at: string;
  daily_records: DailyRecord[];
}

export interface DailyRecord {
  day_of_week: string;
  menu_name: string;
  description: string;
  image_url: string;
  ingredients: string[];
}
