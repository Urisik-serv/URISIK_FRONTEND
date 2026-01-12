import plusIcon from "../../assets/icons/plus.svg";
import minusIcon from "../../assets/icons/minus.svg";

export default function NumberOfMember() {
  return (
    <>
      <div className="flex justify-start items-center gap-3">
        <div className="w-8 h-8 bg-zinc-100 rounded-2xl flex justify-center items-center gap-2.5">
          <img src={minusIcon} alt="인원 감소" />
        </div>
        <div className="w-7 px-2.5 pb-0.5 border-b border-black inline-flex flex-col justify-center items-center gap-2.5">
          <div className="self-stretch justify-start text-black text-lg font-semibold font-['Pretendard'] leading-7">
            0
          </div>
        </div>
        <div className="w-8 h-8 bg-zinc-100 rounded-2xl flex justify-center items-center gap-2.5">
          <img src={plusIcon} alt="인원 증가" />
        </div>
      </div>
    </>
  );
}
