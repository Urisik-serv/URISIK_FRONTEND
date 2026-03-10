import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfileTransWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteProfileTransWishList(
  familyRoomId: number | null,
  profileId: number | undefined,
  size: number,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getProfileTransWishList(familyRoomId, profileId, size, pageParam),
    queryKey: [QUERY_KEY.profileTransWish, familyRoomId, profileId, size],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    enabled: !!familyRoomId && !!profileId,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.result.items),
      pageParams: data.pageParams,
    }),
  });
}

export default useGetInfiniteProfileTransWishList;
