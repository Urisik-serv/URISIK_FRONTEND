interface ProfileDataBoxProps {
  name: string;
  className: string;
}

export default function ProfileDataBox({
  name,
  className,
}: ProfileDataBoxProps) {
  return (
    <>
      <div
        className={`${className} py-[4px] h-[30px] flex justify-center items-center gap-[10px] rounded-sm bg-gray-100`}
      >
        <div className="text-sm leading-[22.26px]">{name}</div>
      </div>
    </>
  );
}
