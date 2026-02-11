import { useState } from "react";
import MealCard from "./MealCard";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import { useGetRecommendList } from "../../../hooks/queries/use-get-recommendations";
import SortDropdown from "../../common/SortDropdown";

interface MealCurationProps {
  category: string | undefined;
}
const MealCuration = ({ category }: MealCurationProps) => {
  const [sortType, setSortType] = useState("별점 순");

  const { data } = useGetRecommendList(sortType, category);

  return (
    <div className="pt-8">
      <div className="pb-4">
        <h1 className="text-zinc-800 text-xl font-semibold tracking-tight">
          다음주에 이런 식단은 어떤가요?
        </h1>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          식단에 추가하고 싶은 메뉴를 스크랩해보세요.
        </p>
      </div>
      <div className="flex justify-end">
        <SortDropdown onSortChange={setSortType} />
      </div>
      {data?.recipes.map((recipe) => (
        <MealCard
          key={recipe.id}
          id={recipe.id}
          shortDescription={recipe.description}
          title={recipe.title}
          rating={recipe.avgScore}
          category={recipe.category}
          img={recipe.imageUrl || SampleImg}
          isSafe={recipe.safe}
          external={null}
          type=""
          typeBool={recipe.transformed}
        />
      ))}
    </div>
  );
};

export default MealCuration;
