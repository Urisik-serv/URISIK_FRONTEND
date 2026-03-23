import { useQuery } from "@tanstack/react-query";
import { getWeekMealPlan } from "../../api/meal-plan";
import { formatYMD } from "../../utils/date";
import { queryFactory } from "./query-factory";

function useGetWeekMealPlan(familyRoomId: number | null, date: string) {
  const todayDate = formatYMD(new Date());

  return useQuery({
    queryFn: () => getWeekMealPlan({ familyRoomId: familyRoomId, date }),
    queryKey: queryFactory.mealPlan.week(familyRoomId, todayDate),
    enabled: !!familyRoomId,
    retry: 1,
    staleTime: Infinity, //같은 날에 바뀔 일은 거의 없어서 무한으로 두었습니다.
    gcTime: 1000 * 60 * 60, //1시간
  });
}

export default useGetWeekMealPlan;
