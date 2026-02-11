import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/family-profile";
import { getFamilyRoom } from "../../api/family-room";

export const useMyProfile = (roomId: number | null) => {
  return useQuery({
    queryKey: ["myProfile", roomId],
    queryFn: async () => {
      const profile = await getProfile(roomId, -1);
      const familyRoom = await getFamilyRoom();

      return {
        profile,
        isLeader: familyRoom.result.capabilities.leader,
      };
    },
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5,
  });
};
