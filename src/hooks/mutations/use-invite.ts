import { useMutation } from "@tanstack/react-query";
import { postInviteToken } from "../../api/invite";

export const useInvite = (familyRoomId: number | null) => {
  return useMutation({
    mutationFn: () => {
      if (!familyRoomId) throw new Error("가족방 없음");
      return postInviteToken(familyRoomId);
    },
  });
};
