const FamilyProfilesSkeleton = () => {
  return (
    <div className="flex self-stretch items-center gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-12 h-3.5 rounded bg-gray-200 animate-pulse mt-0.5" />
      </div>
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-12 h-3.5 rounded bg-gray-200 animate-pulse mt-0.5" />
      </div>
      <div className="shrink-0 flex flex-col items-center gap-1.5 pt-1">
        <div className="w-14 h-14 rounded-full bg-gray-200 animate-pulse" />
        <div className="w-12 h-3.5 rounded bg-gray-200 animate-pulse mt-0.5" />
      </div>
    </div>
  );
};

export default FamilyProfilesSkeleton;
