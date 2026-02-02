import { useState } from "react";
import BackButton from "../../components/common/BackButton";
import ElementButton from "../../components/common/ElementButton";
import RankButton from "../../components/common/RankButton";
import SearchBar from "../../components/common/SearchBar";
import useGetInfiniteSearchRecipes from "../../hooks/queries/use-get-infinite-search-recipes";
import useDebounce from "../../hooks/use-debounce";

const SearchingPage = () => {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 300);

  const {
    data: recipes,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteSearchRecipes(debouncedKeyword, 10, 1);

  console.log(recipes);
  console.log(recipes?.pages);

  const handleClose = () => {};

  return (
    <div className="flex pt-[30px] justify-center items-start flex-col">
      <div className="flex justify-center items-center self-stretch px-4 gap-1 pb-7.5">
        <BackButton />
        <SearchBar keyword={keyword} onChange={(e) => setKeyword(e)} />
      </div>
      <div className="flex flex-col px-4 py-2">
        <div className="pb-7.5">
          <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
            최근 검색어
          </p>
          <div className="flex gap-1.5">
            <ElementButton name="불고기" onClose={handleClose} />
          </div>
        </div>
        <div className="pb-7.5">
          <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
            00님 취향에 맞는 메뉴를 추천해요
          </p>
          <div className="flex gap-1.5">
            <ElementButton name="스프" />
            <ElementButton name="스테이크" />
            <ElementButton name="닭고기" />
            <ElementButton name="생선" />
            <ElementButton name="갈비찜" />
          </div>
        </div>
        <div>
          <p className="pb-3 text-zinc-800 text-base font-semibold leading-6">
            인기 검색어
          </p>
          <div className="h-48 px-5 py-3.5 bg-zinc-100 rounded-lg flex flex-col justify-start items-start gap-4">
            <p className="text-neutral-400 text-xs font-normal leading-4">
              오후 8시 순위
            </p>
            <div className="grid grid-rows-4 grid-flow-col gap-x-10.5 gap-y-4">
              <RankButton rank={1} name="닭볶음탕" up={true} />
              <RankButton rank={2} name="샤브샤브" up={true} />
              <RankButton rank={3} name="새우탕" up={false} />
              <RankButton rank={4} name="김치찌개" up={true} />
              <RankButton rank={5} name="닭볶음탕" up={true} />
              <RankButton rank={6} name="샤브샤브" up={false} />
              <RankButton rank={7} name="새우탕" up={false} />
              <RankButton rank={8} name="김치찌개" up={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchingPage;
