import { useState } from "react";
import menuDownIcon from "../../assets/icons/menu-down.svg";
import menuUpIcon from "../../assets/icons/menu-up.svg";

export default function FamilyTotalNumber() {
  const [familyNumber, setFamilyNumber] = useState(3);

  const handleDecreaseFamily = () => {
    setFamilyNumber((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleIncreaseFamily = () => {
    setFamilyNumber((prev) => prev + 1);
  };

  return (
    <>
      <div className="h-9 px-2 py-1.5 bg-white outline outline-black inline-flex flex-col justify-center items-center gap-2.5">
        <div className="py-1.5 inline-flex justify-start items-center gap-3">
          <button className="cursor-pointer" onClick={handleDecreaseFamily}>
            <img src={menuDownIcon} alt="가족 인원수 감소" />
          </button>
          <div className="justify-start text-black text-base font-semibold font-['Pretendard'] leading-6">
            {familyNumber}
          </div>
          <button className="cursor-pointer" onClick={handleIncreaseFamily}>
            <img src={menuUpIcon} alt="가족 인원수 증가" />
          </button>
        </div>
      </div>
    </>
  );
}
