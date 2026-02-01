import { useState } from "react";
import FamilyTotalNumber from "../../components/family/FamilyTotalNumber";
import PublicHeader from "../../components/header/PublicHeader";
import NumberOfMember from "../../components/family/NumberOfMember";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import SelectButton from "../../components/family/SelectButton";

export default function FamilyCreatePage() {
  const navigate = useNavigate();
  const [familyNumber, setFamilyNumber] = useState(3);
  const [availableFamilyNumber, SetAvailableFamilyNumber] =
    useState(familyNumber);
  const [familyCounts, setFamilyCounts] = useState({
    dad: 0,
    mom: 0,
    son: 0,
    daughter: 0,
  });
  const [isLeader, setIsLeader] = useState({
    dad: false,
    mom: false,
  });

  // 토글
  const select = (role: keyof typeof familyCounts) => {
    const isTurningOn = familyCounts[role] === 0;
    const isParent = role === "mom" || role === "dad";
    if (isTurningOn && availableFamilyNumber <= 0) return;

    setFamilyCounts((prev) => ({
      ...prev,
      [role]: isTurningOn ? 1 : 0,
    }));

    // 선택 되어 있다면?
    if (!isTurningOn && isParent) {
      setIsLeader((prev) => ({
        ...prev,
        [role]: false,
      }));
    }

    SetAvailableFamilyNumber((prev) => (isTurningOn ? prev - 1 : prev + 1));
  };

  // 자식 증가
  const increment = (role: keyof typeof familyCounts) => {
    if (availableFamilyNumber > 0) {
      setFamilyCounts((prev) => ({
        ...prev,
        [role]: prev[role] + 1,
      }));

      SetAvailableFamilyNumber((prev) => prev - 1);
    }
  };

  // 자식 감소
  const decrement = (role: keyof typeof familyCounts) => {
    if (familyCounts[role] > 0) {
      setFamilyCounts((prev) => ({
        ...prev,
        [role]: prev[role] - 1,
      }));

      SetAvailableFamilyNumber((prev) => prev + 1);
    }
  };

  const handleLeader = (role: "mom" | "dad") => {
    if (familyCounts[role] > 0) {
      setIsLeader((prev) => ({
        mom: role === "mom" ? !prev.mom : false,
        dad: role === "dad" ? !prev.dad : false,
      }));
    }
  };

  const canAdjustChildren = familyCounts["mom"] > 0 || familyCounts["dad"] > 0;

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
              setAvailableNumber={SetAvailableFamilyNumber}
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
              <button onClick={() => select("mom")}>
                <SelectButton
                  name="엄마"
                  isSelected={familyCounts["mom"] > 0}
                />
              </button>
              <button onClick={() => select("dad")}>
                <SelectButton
                  name="아빠"
                  isSelected={familyCounts["dad"] > 0}
                />
              </button>
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="self-stretch inline-flex justify-start items-center gap-6">
                <SelectButton
                  name="아들"
                  isSelected={familyCounts["son"] > 0}
                />
                <NumberOfMember
                  number={familyCounts["son"]}
                  increment={() => increment("son")}
                  decrement={() => decrement("son")}
                  isBlocked={!canAdjustChildren}
                />
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-6">
                <SelectButton
                  name="딸"
                  isSelected={familyCounts["daughter"] > 0}
                />
                <NumberOfMember
                  number={familyCounts["daughter"]}
                  increment={() => increment("daughter")}
                  decrement={() => decrement("daughter")}
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
              <button onClick={() => handleLeader("mom")}>
                <SelectButton name="엄마" isSelected={isLeader["mom"]} />
              </button>
              <button onClick={() => handleLeader("dad")}>
                <SelectButton name="아빠" isSelected={isLeader["dad"]} />
              </button>
            </div>
          </div>
          <div className="pt-[264px]">
            <Button
              text="다음"
              type="submit"
              onClick={() => {
                navigate("/family-invite");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
