const MenuListSkeleton = () => {
  return (
    <div className="w-full p-[10px] border-b border-gray-100 flex gap-3 animate-pulse bg-white">
      <div className="w-[52px] h-[52px] bg-gray-200 rounded-lg shrink-0" />

      <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <div className="h-5 bg-gray-200 rounded w-1/2" />

          <div className="h-4 bg-gray-200 rounded w-8" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="w-10 h-5 bg-gray-200 rounded-full shrink-0" />

          <div className="h-3.5 bg-gray-200 rounded w-1/3" />
        </div>
      </div>
    </div>
  );
};

export default MenuListSkeleton;
