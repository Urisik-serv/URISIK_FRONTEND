import { useQuery } from "@tanstack/react-query";
import {
  getProfileTransWishList,
  getProfileWishList,
} from "../../api/wish-list";
import { queryFactory } from "./query-factory";

export type WishReqType = "RECIPE" | "TRANSFORMED";

export const getWishlistKey = (type: WishReqType, id: number | undefined) => {
  return `${type}_${id}`;
};

export const useMyWishlistIds = (
  familyRoomId: number | null,
  profileId: number | undefined,
) => {
  return useQuery({
    queryKey: queryFactory.wishList.wishIds(familyRoomId, profileId),

    queryFn: async () => {
      const [recipeRes, transRes] = await Promise.all([
        getProfileWishList(familyRoomId, profileId, 1000, 0),
        getProfileTransWishList(familyRoomId, profileId, 1000, 0),
      ]);

      const idSet = new Set<string>();

      recipeRes.result.items.forEach((item) => {
        idSet.add(getWishlistKey("RECIPE", item.recipeId));
      });

      transRes.result.items.forEach((item) => {
        idSet.add(getWishlistKey("TRANSFORMED", item.transformedRecipeId));
      });

      console.log("저장된 위시리스트: ", idSet);

      return idSet;
    },

    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!familyRoomId && !!profileId,
  });
};
