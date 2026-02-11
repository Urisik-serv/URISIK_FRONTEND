import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchProfilePic } from "../../api/family-profile";
import toast from "react-hot-toast";

export const usePatchProfilePic = (familyRoomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => patchProfilePic(familyRoomId, file),

    onSuccess: () => {
      toast.success("프로필 사진이 변경되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["myProfile", familyRoomId],
      });
    },

    onError: () => {
      toast.error("프로필 사진 변경에 실패했습니다.");
    },
  });
};
