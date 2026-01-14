import plusIcon from "../../assets/icons/plus.svg";
import minusIcon from "../../assets/icons/minus.svg";

interface NumberOfMemberProps {
  number: number;
  availableNumber: number;
  onChange: (num: number) => void;
  isBlocked: boolean;
}

export default function NumberOfMember({
  number,
  availableNumber,
  onChange,
  isBlocked,
}: NumberOfMemberProps) {
  const handleIncrease = () => {
    if (!isBlocked && availableNumber > 0) {
      onChange(number + 1);
    }
  };

  const handleDecrease = () => {
    if (!isBlocked && number > 0) {
      onChange(number - 1);
    }
  };

  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <button
          onClick={handleDecrease}
          className="cursor-pointer w-8 h-8 bg-zinc-100 rounded-2xl flex justify-center items-center gap-2.5"
        >
          <img src={minusIcon} alt="인원 감소" />
        </button>
        <div className="w-7 px-2.5 pb-0.5 border-b border-black inline-flex flex-col justify-center items-center gap-2.5">
          <div className="self-stretch justify-start text-black text-lg font-semibold font-['Pretendard'] leading-7">
            {number}
          </div>
        </div>
        <button
          onClick={handleIncrease}
          className="cursor-pointer w-8 h-8 bg-zinc-100 rounded-2xl flex justify-center items-center gap-2.5"
        >
          <img src={plusIcon} alt="인원 증가" />
        </button>
      </div>
    </>
  );
}
