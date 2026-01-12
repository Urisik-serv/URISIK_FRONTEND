import { useState } from "react";
import FamilyMemberButton from "../../components/family/FamilyMemberButton";
import FamilyTotalNumber from "../../components/family/FamilyTotalNumber";
import PublicHeader from "../../components/header/PublicHeader";
import NumberOfMember from "../../components/family/NumberOfMember";

export default function FamilyCreatePage() {
  const [dadNumber, setDadNumber] = useState(0);
  const [momNumber, setMomNumber] = useState(0);
  const [sonNumber, setSonNumber] = useState(0);
  const [daughterNumber, setDaughterNumber] = useState(0);

  const handleDadNumber = () => {
    setDadNumber((prev) => (prev > 0 ? (prev = 0) : (prev = 1)));
  };

  const handleMomNumber = () => {
    setMomNumber((prev) => (prev > 0 ? (prev = 0) : (prev = 1)));
  };

  return (
    <>
      <PublicHeader title="가족방 생성하기" />
      <div className="pt-[24px] px-[16px] w-[343px] h-[365px]">
        <div className=" text-neutral-500 text-xl font-semibold  leading-8">
          가정 정보
        </div>
        <div className="pt-[40px]">
          <div className=" text-zinc-800 text-base font-semibold  leading-6">
            가족 인원 수
          </div>
          <div className="flex items-center pt-[8px] gap-[8px]">
            <FamilyTotalNumber />
            <span className="text-zinc-800 text-base font-semibold leading-6">
              인
            </span>
          </div>
          <div className="pt-[32px] flex flex-col gap-[8px]">
            <div className=" text-zinc-800 text-base font-semibold leading-6">
              가족 구성원
            </div>
            <div className="flex gap-[12px]">
              <button onClick={handleMomNumber}>
                <FamilyMemberButton name="엄마" number={momNumber ? 1 : 0} />
              </button>
              <button onClick={handleDadNumber}>
                <FamilyMemberButton name="아빠" number={dadNumber ? 1 : 0} />
              </button>
            </div>
            <div>
              <div className="self-stretch inline-flex justify-start items-center gap-6">
                <FamilyMemberButton
                  name="아들"
                  number={sonNumber > 0 ? 1 : 0}
                />
                <NumberOfMember />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
