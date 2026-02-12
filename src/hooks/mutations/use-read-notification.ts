import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchIsRead } from "../../api/notifications";

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchIsRead,
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: ["noticeList"] });

      const previous = queryClient.getQueryData(["noticeList"]);

      queryClient.setQueryData(["noticeList"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          result: {
            ...old.result,
            content: old.result.content.map((item: any) =>
              item.id === notificationId ? { ...item, isRead: true } : item,
            ),
          },
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["noticeList"], context?.previous);
    },
  });
};
