const AllergyRecipeCardSkeleton = () => {
  return (
    <div className="w-full py-3 px-2.5 rounded-xl border-2 border-gray-100 animate-pulse bg-white animate-pulse">
      <div className="flex justify-between items-center h-32">
        <div className="w-44 h-full flex flex-col justify-between">
          <div className="pb-4">
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

            <div className="h-3 w-full bg-gray-200 rounded mb-1" />
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>

          <div className="flex gap-1 items-center">
            <div className="w-3.5 h-3.5 rounded-full bg-gray-200 shrink-0" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="w-32 h-32 bg-gray-200 rounded-lg shrink-0" />
      </div>
    </div>
  );
};

export default AllergyRecipeCardSkeleton;
