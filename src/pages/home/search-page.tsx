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
import { getProfile } from "../../api/family-profile";
import {
  getPopularSearch,
  getRecommendSearch,
  postPopularSearch,
} from "../../api/search";
import type { RecommendSearch } from "../../types/recipes";

const SearchingPage = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  {
    /*isLoading,
    isError,
    아직 추가하지 않음 */
  }
  const { data: recipes } = useGetSearchRecipes(debouncedKeyword, 0, 6);

  const { keywords, removeKeyword } = useRecentSearch();

  // 내 정보
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const [nickname, setNickname] = useState("");

  // 추천 검색어
  const [recommend, setRecommend] = useState<RecommendSearch>();

  // 인기검색어 TOP8
  const [popular, setPopular] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getProfile(familyRoomId, -1);
      setNickname(profileData.nickname);

      const recommendData = await getRecommendSearch(familyRoomId);
      setRecommend(recommendData.result);

      await postPopularSearch();
      const popularData = await getPopularSearch();
      setPopular(popularData.result);
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
          <div className="pb-7.5">
            <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
              {nickname || "사용자"}님 취향에 맞는 메뉴를 추천해요
            </p>
            <div className="flex gap-1.5">
              {recommend?.recipeName.map((recommendName) => (
                <ElementButton name={recommendName} />
              ))}
            </div>
          </div>
          <div>
            <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
              인기 검색어
            </p>
            <div className="h-48 px-5 py-3.5 bg-primary-100 rounded-lg flex flex-col justify-start items-start gap-4">
              <p className="text-neutral-400 text-xs font-normal leading-4">
                오후 8시 순위
              </p>
              <div className="grid grid-rows-4 grid-flow-col gap-x-10.5 gap-y-4">
                <RankButton
                  rank={1}
                  name={popular[0]}
                  up={true}
                  onClick={() => setKeyword(popular[0])}
                />
                <RankButton
                  rank={2}
                  name={popular[1]}
                  up={true}
                  onClick={() => setKeyword(popular[1])}
                />
                <RankButton
                  rank={3}
                  name={popular[2]}
                  up={false}
                  onClick={() => setKeyword(popular[2])}
                />
                <RankButton
                  rank={4}
                  name={popular[3]}
                  up={true}
                  onClick={() => setKeyword(popular[3])}
                />
                <RankButton
                  rank={5}
                  name={popular[4]}
                  up={true}
                  onClick={() => setKeyword(popular[4])}
                />
                <RankButton
                  rank={6}
                  name={popular[5]}
                  up={false}
                  onClick={() => setKeyword(popular[5])}
                />
                <RankButton
                  rank={7}
                  name={popular[6]}
                  up={false}
                  onClick={() => setKeyword(popular[6])}
                />
                <RankButton
                  rank={8}
                  name={popular[7]}
                  up={true}
                  onClick={() => setKeyword(popular[7])}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col px-4 py-2 pb-15">
          {recipes?.result.items.map((item) => (
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
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchingPage;
