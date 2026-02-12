import { useEffect, useState } from "react";
import BackButton from "../../components/common/BackButton";
import ElementButton from "../../components/common/ElementButton";
import RankButton from "../../components/common/RankButton";
import SearchBar from "../../components/common/SearchBar";
import useDebounce from "../../hooks/use-debounce";
import MealCard from "../../components/home/curation/MealCard";
import useGetSearchRecipes from "../../hooks/queries/use-get-search-recipes";
import { useRecentSearch } from "../../hooks/use-recent-search";
import { useFamilyStore } from "../../stores/use-family-store";
import {
  getPopularSearch,
  getRecommendSearch,
  postPopularSearch,
} from "../../api/search";
import type { PopularSearches, RecommendSearch } from "../../types/recipes";
import { useMyProfileStore } from "../../stores/use-my-profile-store";
import { formatRankingTime } from "../../utils/date";
import alertImage from "../../assets/images/alert-circle.png";
import MealCardSkeleton from "../../components/skeltons/MealCardSkeleton";

const SearchingPage = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  {
    /*
    isError,
    아직 추가하지 않음 */
  }
  const { data: recipes, isLoading } = useGetSearchRecipes(
    debouncedKeyword,
    0,
    6,
  );
  const isSearching = isLoading || keyword !== debouncedKeyword;

  const { keywords, removeKeyword } = useRecentSearch();

  // 내 정보
  const familyRoomId = useFamilyStore((state) => state.familyRoomId);
  const nickname = useMyProfileStore((state) => state.nickname);

  // 추천 검색어
  const [recommend, setRecommend] = useState<RecommendSearch>();

  // 인기검색어 TOP8
  const [popular, setPopular] = useState<PopularSearches>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recommendData = await getRecommendSearch(familyRoomId);
        setRecommend(recommendData.result);
      } catch (error) {
        console.warn("추천 검색어 로딩 실패 :", error);
      }

      try {
        await postPopularSearch();
        const popularData = await getPopularSearch();
        setPopular(popularData.result);
        console.log("인기 검색어 로딩 성공:", popularData.result);
      } catch (error) {
        console.error("인기 검색어 로딩 실패:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex pt-[30px] justify-center items-start flex-col w-full">
      <div className="flex justify-center items-center self-stretch px-4 gap-1 pb-7.5 w-full">
        <BackButton />
        <SearchBar keyword={keyword} onChange={(e) => setKeyword(e)} />
      </div>
      {keyword === "" ? (
        <div className="flex flex-col px-4 py-2 w-full">
          <div className="pb-7.5">
            <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
              최근 검색어
            </p>
            <div
              className="flex gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden
              [scrollbar-width:none] "
            >
              {keywords.map((recent) => (
                <ElementButton
                  key={recent}
                  name={recent}
                  onClose={() => removeKeyword(recent)}
                  onClick={() => setKeyword(recent)}
                />
              ))}
            </div>
          </div>
          {recommend && recommend.recipeName.length > 0 && (
            <div className="pb-7.5">
              <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
                {nickname || "사용자"}님 취향에 맞는 메뉴를 추천해요
              </p>
              <div className="flex gap-1.5">
                {recommend.recipeName.map((recommendName) => (
                  <ElementButton
                    key={recommendName}
                    name={recommendName}
                    onClick={() => setKeyword(recommendName)}
                  />
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
              인기 검색어
            </p>
            <div className="h-48 px-5 py-3.5 bg-primary-100 rounded-lg flex flex-col justify-start items-start gap-4">
              <p className="text-neutral-400 text-xs font-normal leading-4">
                {formatRankingTime(popular?.windowEnd)}
              </p>
              <div className="grid grid-rows-4 grid-flow-col gap-x-10.5 gap-y-4 w-full">
                {popular?.keywords.slice(0, 8).map((item) => (
                  <RankButton
                    key={item.keyword}
                    rank={item.rank}
                    change={item.change}
                    name={item.keyword}
                    onClick={() => setKeyword(item.keyword)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-4 py-2 pb-15 w-full">
          {isSearching ? (
            <>
              {Array.from({ length: 5 }).map((_, index) => (
                <MealCardSkeleton key={index} />
              ))}
            </>
          ) : recipes?.result.items && recipes.result.items.length > 0 ? (
            recipes?.result.items.map((item) => (
              <MealCard
                key={item.id}
                id={item.id}
                title={item.title}
                shortDescription={item.description}
                isSafe={item.safe}
                category={item.category}
                rating={item.avgScore}
                img={item.imageUrl}
                type={item.type}
                external={item.external}
              />
            ))
          ) : (
            <div className="w-full pt-[48px] flex flex-col items-center gap-[11px]">
              <img src={alertImage} alt="알림 아이콘" className="size-[76px]" />
              <div className="text-center font-medium text-[16px] text-gray-600">
                조건에 맞는 식단이 없어요
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchingPage;
