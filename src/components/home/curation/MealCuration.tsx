import MealCard from "./MealCard";

const MealCuration = () => {
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
      <MealCard />
      <MealCard />
    </div>
  );
};

export default MealCuration;
