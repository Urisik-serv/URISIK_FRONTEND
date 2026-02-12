import { useState } from "react";
import Button from "../common/Button";
import ReviewModal from "./ReviewModal";
import type { TodayMeal } from "../../types/meal-plan";
import IngredientAndRecipe from "../common/IngredientAndRecipe";

export default function TodayMeal({ data }: { data: TodayMeal }) {
  const [isDone, setIsDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(false);
  return (
    <>
      <div className="flex justify-between items-center pt-3 pb-6">
        {isOpen && (
          <ReviewModal
            recipeId={data.id}
            onClick={handleOpen}
            type={data.type}
          />
        )}
        <div>
          {/* <p className="font-normal text-[16px] leading-[1.5]">우유대신,</p> */}

          <p className="font-semibold text-[18px] tracking-[0.01em] text-gray-600">
            {data.title.split(" ").map((title, idx) => (
              <span key={idx}>
                {title} {idx % 2 === 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <img
          src={data.imageUrl}
          alt={`${data.title} 이미지`}
          className="w-41 h-29 object-cover rounded-lg"
        />
      </div>
      {!isDone ? (
        <Button
          type="button"
          text="식사 완료"
          onClick={() => setIsDone(true)}
        />
      ) : (
        <Button
          type="button"
          text="리뷰 작성"
          bgColor="white"
          onClick={() => setIsOpen(true)}
        />
      )}
      <div className="pt-11 pb-29">
        <IngredientAndRecipe
          ingredients={data.ingredients}
          step={data.recipeSteps}
        />
      </div>
    </>
  );
}
