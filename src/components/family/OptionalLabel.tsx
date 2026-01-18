export default function OptionalLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center ">
      <label className="text-[#282828] text-lg font-medium leading-[27px] ">
        {title}
      </label>

      <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
        (선택)
      </div>
    </div>
  );
}
