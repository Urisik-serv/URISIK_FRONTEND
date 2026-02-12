import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfile } from "../../api/family-profile";

export const useDeleteProfile = (familyRoomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => deleteProfile(familyRoomId, profileId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["familyProfiles", familyRoomId],
      });
    },
  });
};
