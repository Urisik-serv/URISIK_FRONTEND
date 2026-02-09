import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFamilyWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";
import type { FamilyWishListBody } from "../../types/wish-list";

function useDeleteFamilyWishLists(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FamilyWishListBody) =>
      deleteFamilyWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.familyWish] });
    },
    onError: (error) => {
      console.log("가족 위시리스트 삭제 실패: ", error);
    },
  });
}

export default useDeleteFamilyWishLists;
