import { useEffect, useState } from "react";
import MealCard from "./MealCard";
import type { FoodList } from "../../../types/recipes";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import axios from "axios";

const MealCuration = () => {
  // mock data fetching
  const [data, setData] = useState<FoodList | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/recipe-list.json");

        setData(response.data);
      } catch (error) {
        console.log("데이터 로딩 실패: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-8">
      <div>
        <h1 className="text-zinc-800 text-xl font-semibold tracking-tight">
          다음주에 이런 식단은 어떤가요?
        </h1>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          식단에 추가하고 싶은 메뉴를 스크랩해보세요.
        </p>
      </div>
      {data?.recipes.map((recipe) => (
        <MealCard
          key={recipe.id}
          id={String(recipe.id)}
          shortDescription={recipe.shortDescription}
          title={recipe.title}
          rating={recipe.rating}
          category={recipe.category}
          img={SampleImg}
          external={null}
          type="RECIPE"
        />
      ))}
    </div>
  );
};

export default MealCuration;
