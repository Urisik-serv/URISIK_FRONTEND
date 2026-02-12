import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/family-profile";
import { getFamilyRoom } from "../../api/family-room";

export const useMyProfile = (roomId: number | null) => {
  const profileQuery = useQuery({
    queryKey: ["myProfile", roomId],
    queryFn: () => getProfile(roomId!, -1),
    enabled: !!roomId,
    staleTime: 1000 * 60 * 5,
  });

  const familyRoomQuery = useQuery({
    queryKey: ["familyRoom"],
    queryFn: getFamilyRoom,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...profileQuery,
    data: profileQuery.data
      ? {
          profile: profileQuery.data,
          isLeader: familyRoomQuery.data?.result.capabilities.leader,
        }
      : undefined,
  };
};
