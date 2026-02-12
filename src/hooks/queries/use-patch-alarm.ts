import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchAlarm } from "../../api/member";

export const usePatchAlarm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAlarm,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alarmPolicy"] });
    },
  });
};
