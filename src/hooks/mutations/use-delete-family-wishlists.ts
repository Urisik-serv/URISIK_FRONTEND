import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFamilyWishList } from "../../api/wish-list";
import type { FamilyWishListBody } from "../../types/wish-list";
import toast from "react-hot-toast";
import { queryFactory } from "../queries/query-factory";

function useDeleteFamilyWishLists(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FamilyWishListBody) =>
      deleteFamilyWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryFactory.wishList.familyWishLists(familyRoomId),
      });
    },
    onError: () => {
      toast.error("가족 위시리스트 삭제 실패");
    },
  });
}

export default useDeleteFamilyWishLists;
