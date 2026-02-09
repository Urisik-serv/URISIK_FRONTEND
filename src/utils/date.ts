//date 형식의 객체를 2026-00-00 형식으로 변환해주는 함수
export function formatYMD(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

//함수를 호출한 날짜 기준으로 다음주 월요일 날짜를 계산
export function getNextMonday(baseDate = new Date()) {
  const d = new Date(baseDate);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
  // 다음 주 월요일까지 남은 일수:
  // Mon(1)->7, Tue(2)->6, ... Sun(0)->1
  const daysUntilNextMonday = day === 0 ? 1 : 8 - day;

  d.setDate(d.getDate() + daysUntilNextMonday);
  return formatYMD(d);
}

//함수를 호출한 날짜 기준으로 이번주 월요일 날짜를 계산
export function getThisMonday(baseDate = new Date()) {
  const d = new Date(baseDate);
  d.setHours(0, 0, 0, 0);

  const day = d.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
  // 이번 주 월요일부터 지난 일수:
  // Mon(1)->0, Tue(2)->1, ... Sun(0)->6
  const days = day === 0 ? 6 : day - 1;

  d.setDate(d.getDate() - days);
  return formatYMD(d);
}

//ListHeader의 "1월 첫째주" 를 표시하기 위한 함수
export function getWeekOfMonth(date = new Date()) {
  const d = new Date(date);
  const month = d.getMonth() + 1;
  const firstDate = new Date(d.getFullYear(), d.getMonth(), 1);

  // 1일에서 오늘까지 몇 밤 지났는지 + 1일의 요일 보정
  const offset = firstDate.getDay() === 0 ? 6 : firstDate.getDay() - 1;
  const week = Math.ceil((d.getDate() + offset) / 7);

  const weekNames = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];
  return { month, weekKor: weekNames[week - 1] || "오류" };
}
