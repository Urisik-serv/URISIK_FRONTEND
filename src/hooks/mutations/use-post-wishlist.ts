import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddWishList } from "../../api/wish-list";
import type { ProfileWishListBody } from "../../types/wish-list";
import toast from "react-hot-toast";
import { queryFactory } from "../queries/query-factory";

function usePostWishList(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileWishListBody) =>
      postAddWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryFactory.wishList.all(familyRoomId),
      });

      toast.success("위시리스트 추가 성공. 목록을 갱신합니다.");
    },
    onError: () => {
      toast.error("위시리스트 추가 실패");
    },
  });
}

export default usePostWishList;
