import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { patchProfile, postProfile } from "../../api/family-profile";
import toast from "react-hot-toast";

export const useProfileMutation = (
  familyRoomId: number | null,
  isEdit?: boolean,
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: any) =>
      isEdit
        ? patchProfile(familyRoomId!, data)
        : postProfile(familyRoomId!, data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate(isEdit ? "/" : "/invite");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message ?? "저장에 실패했습니다.");
    },
  });
};
