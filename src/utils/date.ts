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
