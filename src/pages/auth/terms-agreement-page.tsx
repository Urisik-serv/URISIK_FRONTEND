import Button from "../../components/common/Button";
import PublicHeader from "../../components/header/PublicHeader";
import TermsAgreementRow from "../../components/terms/TermsAgreementRow";
import CheckBoxEmpty from "../../assets/icons/check-box-empty.svg";
import checkBox from "../../assets/icons/Check_box.svg";
import { useState } from "react";

interface TermItem {
  index: number;
  isChecked: boolean;
}

export default function TermsAgreementPage() {
  // 5개의 약관 상태를 false로 초기화
  const [terms, setTerms] = useState<TermItem[]>([
    { index: 0, isChecked: false },
    { index: 1, isChecked: false },
    { index: 2, isChecked: false },
    { index: 3, isChecked: false },
    { index: 4, isChecked: false },
  ]);

  const allChecked = terms.length > 0 && terms.every((term) => term.isChecked);

  const handleCheck = (index: number) => {
    setTerms((prev) =>
      prev.map((term) =>
        term.index === index ? { ...term, isChecked: !term.isChecked } : term,
      ),
    );
  };

  const handleAllCheck = () => {
    const nextStatus = !allChecked;
    setTerms((prev) =>
      prev.map((term) => ({ ...term, isChecked: nextStatus })),
    );
  };

  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="flex flex-col pl-[17px]">
        <div className="w-64 justify-start text-zinc-800 text-2xl font-medium font-['Wanted_Sans'] leading-9 pt-[24px]">
          서비스 이용을 위해
          <br />
          이용약관 동의가 필요해요
        </div>
        <div className="pt-[56px]">
          <div className="self-stretch px-4 py-3 rounded-lg outline outline-[1.5px] outline-[#B8B8B8] inline-flex justify-start items-center gap-24 ">
            <div className="justify-start text-zinc-800 text-xl font-medium font-['Wanted_Sans'] tracking-tight">
              모든 약관에 동의합니다.
            </div>
            <button
              onClick={handleAllCheck}
              data-property-1="Default"
              className="w-6 h-6 relative overflow-hidden cursor-pointer"
            >
              {allChecked ? (
                <img src={checkBox} alt="체크된 체크박스" />
              ) : (
                <img src={CheckBoxEmpty} alt="빈 체크박스" />
              )}
            </button>
          </div>
        </div>
        <div className="pt-[40px] flex flex-col items-center pr-[16px]">
          {terms.map((term) => (
            <TermsAgreementRow
              isChecked={term.isChecked}
              onChecked={() => handleCheck(term.index)}
            />
          ))}
        </div>
        <div className="pt-[159px]">
          <Button text={`다음`} type="button" />
        </div>
      </div>
    </>
  );
}
