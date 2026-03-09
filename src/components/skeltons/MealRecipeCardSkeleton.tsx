const MealRecipeCardSkeleton = () => {
  return (
    <div className="flex py-4 w-full gap-5 animate-pulse">
      <div className="w-32 h-32 bg-gray-200 rounded-xl shrink-0" />

      <div className="flex flex-col items-start gap-1.5 flex-1 min-w-0">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-1" />

        <div className="flex gap-2 w-full items-center pb-2">
          <div className="h-3.5 bg-gray-200 rounded w-10" />
          <div className="h-3.5 bg-gray-200 rounded w-12" />
        </div>

        <div className="h-6 bg-gray-200 rounded-full w-14 mb-1" />

        <div className="flex flex-col gap-1 w-full">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default MealRecipeCardSkeleton;
