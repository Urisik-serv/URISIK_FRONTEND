import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getSearchRecipes } from "../../api/recipes";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseSearchRecipes } from "../../types/recipes";

function useGetInfiniteSearchRecipes(
  keyword: string,
  page?: number,
  size?: number,
) {
  const isRealSearch = keyword.trim() !== "";

  const isInitialLoad = keyword === "";

  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSearchRecipes({ keyword, page, size }),
    queryKey: [QUERY_KEY.search, keyword],
    initialPageParam: 1,
    getNextPageParam: (lastPage: ResponseSearchRecipes, allPages) => {
      console.log(lastPage, allPages);
      const items = lastPage.result.items;

      if (!items || items.length < size) {
        return undefined;
      }
      return allPages.length + 1;
    },
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    placeholderData: keepPreviousData,
    enabled: isInitialLoad || isRealSearch,
  });
}

export default useGetInfiniteSearchRecipes;
