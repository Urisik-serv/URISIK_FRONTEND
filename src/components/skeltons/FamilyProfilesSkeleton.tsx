const FamilyProfilesSkeleton = () => {
  const SKELETON_ITEM_COUNT = 3;
  return (
    <div aria-busy="true">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        가족 프로필 불러오는 중…
      </div>
      <div
        aria-hidden="true"
        className="flex self-stretch items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, index) => (
          <div
            key={index}
            className="shrink-0 flex flex-col items-center gap-1.5 pt-1"
          >
            <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-12 h-3.5 rounded bg-gray-200 animate-pulse mt-0.5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyProfilesSkeleton;
