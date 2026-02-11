import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/family-profile";
import {
  allergyMap,
  roleMap,
  rolePicture,
} from "../../constants/profile-record";

export const useGetProfile = (familyRoomId: number | null) => {
  return useQuery({
    queryKey: ["profile", familyRoomId],
    queryFn: () => getProfile(familyRoomId!, -1),
    enabled: !!familyRoomId,
    select: (data) => {
      return {
        nickname: data.nickname,
        role: roleMap[data.role],
        preferences: data.dietPreferences ?? [],
        likedIngredients: data.likedIngredients ?? "",
        dislikedIngredients: data.dislikedIngredients ?? "",
        profilePicUrl: data.profilePicUrl ?? rolePicture[data.role],

        allergies: data.allergyAndAlterIngredients
          .map((item) => allergyMap[item.allergen])
          .filter(Boolean),
      };
    },
    staleTime: 1000 * 60 * 5,
  });
};
