import { useQuery } from "@tanstack/react-query";
import { getAlarm } from "../../api/member";

export const useAlarm = () => {
  return useQuery({
    queryKey: ["alarmPolicy"],
    queryFn: getAlarm,
    staleTime: 1000 * 60 * 5,
  });
};
