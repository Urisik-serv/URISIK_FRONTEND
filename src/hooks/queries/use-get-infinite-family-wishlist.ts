import { useInfiniteQuery } from "@tanstack/react-query";
import { getFamilyWishList } from "../../api/wish-list";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteFamilyWishList(
  familyRoomId: number | null,
  size: number,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getFamilyWishList(familyRoomId, size, pageParam),
    queryKey: [QUERY_KEY.familyWish, familyRoomId, size],
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      if (lastPage.headers["x-has-next"] === false) return undefined;
      return lastPage.headers["x-next-cursor"];
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    enabled: !!familyRoomId,
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.data.result),
      pageParams: data.pageParams,
    }),
  });
}

export default useGetInfiniteFamilyWishList;
