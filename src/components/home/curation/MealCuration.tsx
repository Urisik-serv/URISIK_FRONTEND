import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import type { RecommendPopularRecipes } from "../../../types/recipes";
import { getRecommendScore } from "../../../api/recommendations";
import SortDropdown from "../../common/SortDropDown";

const MealCuration = () => {
  const [sortType, setSortType] = useState("별점 순");
  const [data, setData] = useState<RecommendPopularRecipes>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRecommendScore();

        setData(response.result);
      } catch (error) {
        console.log("데이터 로딩 실패: ", error);
      }
    };

    fetchData();
  }, []);

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
          external={null}
          type="RECIPE"
        />
      ))}
    </div>
  );
};

export default MealCuration;
