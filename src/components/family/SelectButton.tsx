interface FamilyMemberProps {
  name: string;
  isSelected: boolean;
}

export default function SelectButton({ name, isSelected }: FamilyMemberProps) {
  return (
    <>
      {isSelected ? (
        <div className="h-[36px] px-6 py-1.5 bg-primary-700 rounded-xl inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-white text-[15px] font-semibold leading-6">
            {name}
          </div>
        </div>
      ) : (
        <div className="h-[36px] px-6 py-1.5 rounded-xl outline outline-[1px] outline-primary-700 inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-primary-700 text-[15px] font-semibold leading-6">
            {name}
          </div>
        </div>
      )}
    </>
  );
}
