import { useInfiniteQuery } from "@tanstack/react-query";
import { getProfileWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteProfileWishList(
  familyRoomId: number | null,
  profileId: number | undefined,
  size: number,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getProfileWishList(familyRoomId, profileId, size, pageParam),
    queryKey: [QUERY_KEY.profileWish, familyRoomId, profileId, size],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.result.items),
      pageParams: data.pageParams,
    }),
  });
}

export default useGetInfiniteProfileWishList;
