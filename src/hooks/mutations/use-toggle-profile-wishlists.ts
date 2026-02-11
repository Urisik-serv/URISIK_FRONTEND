// hooks/mutations/use-toggle-wishlist.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWishlistKey,
  type WishReqType,
} from "../queries/use-my-wishlist-ids";
import { deleteProfileWishList, postAddWishList } from "../../api/wish-list";

export const useToggleWishlist = (familyRoomId: number, profileId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["my-wishlist-ids", familyRoomId, profileId];

  return useMutation({
    // mutationFn은 id뿐만 아니라 type도 받아야 함
    mutationFn: async ({
      type,
      id,
      isWished,
    }: {
      type: WishReqType;
      id: number;
      isWished: boolean;
    }) => {
      // 이미 위시리스트에 있으면 삭제, 없으면 추가 API 호출
      if (isWished) {
        // 삭제 API (타입에 따라 다른 API 호출이 필요할 수 있음)
        return deleteProfileWishList;
      } else {
        // 추가 API
        return postAddWishList;
      }
    },

    // ✅ 성공 시 캐시 직접 수정 (Optimistic Update 효과)
    onSuccess: (_, variables) => {
      const { type, id } = variables;
      const targetKey = getWishlistKey(type, id); // "RECIPE_10" 생성

      // 쿼리 데이터 수동 업데이트
      queryClient.setQueryData(queryKey, (oldSet: Set<string> | undefined) => {
        if (!oldSet) return new Set([targetKey]);

        const newSet = new Set(oldSet);
        if (newSet.has(targetKey)) {
          newSet.delete(targetKey); // 있으면 제거 (하트 끔)
        } else {
          newSet.add(targetKey); // 없으면 추가 (하트 켬)
        }
        return newSet;
      });
    },
  });
};
