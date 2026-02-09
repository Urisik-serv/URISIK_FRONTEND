//"LUNCH-MONDAY": {"id": 2,"title": "식단테스트용음식"} 이런 형식으로 들어오는 api response를
// MONDAY{"mealType": "LUNCH", "dayOfWeek": "MONDAY", "id":2 ...} 이런식으로 가공해주는 함수

export function changeAdditionalProp(
  data: Record<string, object>,
  type: "DAY" | "WEEK",
) {
  const response: Record<string, any[]> = {};
  for (const name in data) {
    let [mealType, dayOfWeek] = ["", ""];
    if (type === "DAY") [mealType, dayOfWeek] = name.split("-");
    else [dayOfWeek, mealType] = name.split("-");

    if (!response[dayOfWeek]) {
      response[dayOfWeek] = [];
    }
    response[dayOfWeek].push({ mealType, dayOfWeek, ...data[name] });
  }
  const day = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  //월,화,수 순서대로 재정렬
  const result: Record<string, any[]> = {};
  for (const name of day) {
    if (response[name]) {
      result[name] = response[name];
    }
  }
  return result;
}
