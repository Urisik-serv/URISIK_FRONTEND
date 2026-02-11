import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchIsRead } from "../../api/notifications";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchIsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noticeList"] });
    },
  });
};
