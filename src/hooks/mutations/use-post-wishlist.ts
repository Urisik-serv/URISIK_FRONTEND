import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAddWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";
import type { ProfileWishListBody } from "../../types/wish-list";
import toast from "react-hot-toast";

function usePostWishList(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileWishListBody) =>
      postAddWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myWishlistIds] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.familyWish] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileWish] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileWish] });

      console.log("위시리스트 추가 성공. 목록을 갱신합니다.");
    },
    onError: (error) => {
      console.error("위시리스트 추가 실패:", error);
      toast.error("위시리스트 추가 실패");
    },
  });
}

export default usePostWishList;
