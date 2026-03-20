import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfileWishList } from "../../api/wish-list";
import type { ProfileWishListBody } from "../../types/wish-list";
import toast from "react-hot-toast";
import { queryFactory } from "../queries/query-factory";
import { useMyProfileStore } from "../../stores/use-my-profile-store";

function useDeleteProfileWishLists(familyRoomId: number | null) {
  const queryClient = useQueryClient();
  const { myProfileId } = useMyProfileStore();

  return useMutation({
    mutationFn: (payload: ProfileWishListBody) =>
      deleteProfileWishList(familyRoomId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryFactory.wishList.profileWishLists(
          familyRoomId,
          myProfileId,
        ),
      });
    },
    onError: () => {
      toast.error("프로필 위시리스트 삭제 실패");
    },
  });
}

export default useDeleteProfileWishLists;
