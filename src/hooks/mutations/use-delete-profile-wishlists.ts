import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";
import type { ProfileWishListBody } from "../../types/wish-list";
import toast from "react-hot-toast";

function useDeleteProfileWishLists(familyRoomId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileWishListBody) =>
      deleteProfileWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myWishlistIds] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileWish] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.profileTransWish] });
    },
    onError: () => {
      toast.error("프로필 위시리스트 삭제 실패");
    },
  });
}

export default useDeleteProfileWishLists;
