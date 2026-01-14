import { useState } from "react";
import FamilyMemberButton from "../../components/family/FamilyMemberButton";
import FamilyTotalNumber from "../../components/family/FamilyTotalNumber";
import PublicHeader from "../../components/header/PublicHeader";
import NumberOfMember from "../../components/family/NumberOfMember";
import Button from "../../components/common/Button";

export default function FamilyCreatePage() {
  const [familyNumber, setFamilyNumber] = useState(3);
  const [dadNumber, setDadNumber] = useState(0);
  const [momNumber, setMomNumber] = useState(0);
  const [sonNumber, setSonNumber] = useState(0);
  const [daughterNumber, setDaughterNumber] = useState(0);
  const [momLeader, setMomLeader] = useState(false);
  const [dadLeader, setDadLeader] = useState(false);

  const availableNumber =
    familyNumber -
    (momNumber ? 1 : 0) -
    (dadNumber ? 1 : 0) -
    sonNumber -
    daughterNumber;

  const handleDadNumber = () => {
    setDadNumber((prev) => (prev > 0 ? (prev = 0) : (prev = 1)));
  };

  const handleMomNumber = () => {
    setMomNumber((prev) => (prev > 0 ? (prev = 0) : (prev = 1)));
  };

  const handleSonChange = (num: number) => {
    setSonNumber(num);
  };

  const handleDaughterChange = (num: number) => {
    setDaughterNumber(num);
  };

  const handleMomLeader = () => {
    if (momNumber > 0 && !dadLeader) {
      setMomLeader((prev) => !prev);
    }
  };

  const handleDadLeader = () => {
    if (dadNumber > 0 && !momLeader) {
      setDadLeader((prev) => !prev);
    }
  };

  const canAdjustChildren = momNumber > 0 || dadNumber > 0;

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
            <FamilyTotalNumber
              familyNumber={familyNumber}
              setFamilyNumber={setFamilyNumber}
            />
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
            <div className="flex flex-col gap-[8px]">
              <div className="self-stretch inline-flex justify-start items-center gap-6">
                <FamilyMemberButton
                  name="아들"
                  number={sonNumber > 0 ? 1 : 0}
                />
                <NumberOfMember
                  number={sonNumber}
                  availableNumber={availableNumber}
                  onChange={handleSonChange}
                  isBlocked={!canAdjustChildren}
                />
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-6">
                <FamilyMemberButton
                  name="딸"
                  number={daughterNumber > 0 ? 1 : 0}
                />
                <NumberOfMember
                  number={daughterNumber}
                  availableNumber={availableNumber}
                  onChange={handleDaughterChange}
                  isBlocked={!canAdjustChildren}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] pt-[32px]">
            <div className="self-stretch justify-start">
              <span className="text-zinc-800 text-base font-semibold leading-6">
                방장{" "}
              </span>
              <span className="text-zinc-800 text-base font-normal leading-6">
                (식단 관리자)
              </span>
            </div>
            <div className="flex gap-[12px]">
              <button onClick={handleMomLeader}>
                <FamilyMemberButton name="엄마" number={momLeader ? 1 : 0} />
              </button>
              <button onClick={handleDadLeader}>
                <FamilyMemberButton name="아빠" number={dadLeader ? 1 : 0} />
              </button>
            </div>
          </div>
          <div className="pt-[264px]">
            <Button text="방 생성하기" type="submit" />
          </div>
        </div>
      </div>
    </>
  );
}
