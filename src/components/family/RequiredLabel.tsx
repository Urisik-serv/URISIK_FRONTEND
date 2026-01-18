export default function RequiredLabel({ title }: { title: string }) {
  return (
    <div className="flex items-center ">
      <label className="text-[#282828] text-lg font-medium leading-[27px] ">
        {title}
      </label>
      <div className="text-[#FF1A1A] text-lg font-medium leading-[27px]">*</div>
      <div className="pl-[4px] text-[#6A6A6A] text-[15px] font-normal leading-[22.5px]">
        (필수)
      </div>
    </div>
  );
}
