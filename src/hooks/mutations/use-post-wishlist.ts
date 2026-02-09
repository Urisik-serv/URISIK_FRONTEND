import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";
import type { ProfileWishListBody } from "../../types/wish-list";

function usePostWishList(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileWishListBody) =>
      postAddWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.familyWish] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileWish] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileWish] });

      console.log("위시리스트 추가 성공. 목록을 갱신합니다.");
    },
    onError: (error) => {
      console.error("위시리스트 추가 실패:", error);
    },
  });
}

export default usePostWishList;
