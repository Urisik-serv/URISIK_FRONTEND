import chevronLeftGray from "../../assets/icons/chevron-left-gray.svg";
import checkBox from "../../assets/icons/Check_box.svg";
import emptyCheckBox from "../../assets/icons/Check_box_empty.svg";
import { useState } from "react";

export default function TermsAgreementRow() {
  const [checked, setChecked] = useState(false);

  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <>
      <div className="w-80 inline-flex justify-between items-center pb-[20px]">
        <div className="flex flex-row items-center gap-[4px]">
          <div className="justify-start text-zinc-900 text-lg font-medium font-['Wanted_Sans'] leading-7">
            서비스 이용 약관 (필수)
          </div>
          <button className="w-6 h-6 cursor-pointer">
            <img
              src={chevronLeftGray}
              alt="서비스 이용 약관 더보기 버튼"
              className="size-[24px]"
            />
          </button>
        </div>
        <button onClick={handleToggle} className="cursor-pointer">
          {checked ? (
            <img src={checkBox} alt="checkBox" />
          ) : (
            <img src={emptyCheckBox} alt="emptycheckBox" />
          )}
        </button>
      </div>
    </>
  );
}
