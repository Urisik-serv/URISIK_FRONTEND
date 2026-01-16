interface FamilyMemberProps {
  name: string;
  number: number;
}

export default function FamilyMemberButton({
  name,
  number,
}: FamilyMemberProps) {
  return (
    <>
      {number > 0 ? (
        <div className="px-6 py-1.5 bg-orange-400 rounded-xl inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-white text-[15px] font-semibold leading-6">
            {name}
          </div>
        </div>
      ) : (
        <div className="px-6 py-1.5 rounded-xl ring ring-[1px] ring-orange-400 inline-flex justify-center items-center gap-2.5">
          <div className="justify-start text-orange-400 text-[15px] font-semibold leading-6">
            {name}
          </div>
        </div>
      )}
    </>
  );
}
