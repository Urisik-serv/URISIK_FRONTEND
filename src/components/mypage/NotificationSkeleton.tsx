export default function NotificationSkeleton() {
  return (
    <div className="animate-pulse w-full h-[88px] py-[16px] px-[20px] flex justify-between gap-5  bg-gray-200 rounded-xl">
      <div className="flex items-start  size-[26px] bg-white rounded-full" />
      <div className="w-65 flex flex-col  gap-2">
        <div className="bg-white h-5 rounded-xl" />
        <div className="bg-white h-10 rounded-xl" />
      </div>
    </div>
  );
}
