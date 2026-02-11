import { useQuery } from "@tanstack/react-query";
import { getProfiles } from "../../api/family-profile";

export const useFamilyProfiles = (familyRoomId: number | null) => {
  return useQuery({
    queryKey: ["familyProfiles", familyRoomId],
    queryFn: async () => {
      const res = await getProfiles(familyRoomId as number);
      return res.result.familyDetails;
    },
    enabled: !!familyRoomId,
    staleTime: 1000 * 60 * 5,
  });
};
