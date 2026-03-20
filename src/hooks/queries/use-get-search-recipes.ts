import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSearchRecipes } from "../../api/recipes";
import { useRecentSearch } from "../use-recent-search";
import { useEffect } from "react";
import { queryFactory } from "./query-factory";

function useGetSearchRecipes(keyword: string, page?: number, size?: number) {
  const isRealSearch = keyword.trim() !== "";

  const { addKeyword } = useRecentSearch();

  const queryResult = useQuery({
    queryFn: () => getSearchRecipes({ keyword, page, size }),
    queryKey: queryFactory.recipe.searchRecipe(keyword),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    placeholderData: keepPreviousData,
    enabled: isRealSearch,
  });

  useEffect(() => {
    if (queryResult.isSuccess && isRealSearch && queryResult.data) {
      addKeyword(keyword);
    }
  }, [
    queryResult.isSuccess,
    queryResult.data,
    isRealSearch,
    keyword,
    addKeyword,
  ]);

  return queryResult;
}

export default useGetSearchRecipes;
