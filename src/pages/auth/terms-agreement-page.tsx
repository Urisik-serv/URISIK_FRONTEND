import Button from "../../components/common/Button";
import PublicHeader from "../../components/header/PublicHeader";
import TermsAgreementRow from "../../components/terms/TermsAgreementRow";
import CheckBoxEmpty from "../../assets/icons/check-box-empty.svg";
import checkBox from "../../assets/icons/Check_box.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

  const isValid = () => {
    if (
      terms[0].isChecked &&
      terms[1].isChecked &&
      terms[2].isChecked &&
      terms[3].isChecked
    ) {
      return true;
    }
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
          <TermsAgreementRow
            isChecked={terms[0].isChecked}
            onChecked={() => handleCheck(terms[0].index)}
            title="서비스 이용 악관(필수)"
            to="../terms-of-service"
          />
          <TermsAgreementRow
            isChecked={terms[1].isChecked}
            onChecked={() => handleCheck(terms[1].index)}
            title="개인 정보 처리 방침 (필수)"
            to="../privacy-policy"
          />
          <TermsAgreementRow
            isChecked={terms[2].isChecked}
            onChecked={() => handleCheck(terms[2].index)}
            title="아동·가족 정보 조항 (필수)"
            to="../children-and-family"
          />
          <TermsAgreementRow
            isChecked={terms[3].isChecked}
            onChecked={() => handleCheck(terms[3].index)}
            title="AI 추천 고지 (필수)"
            to="../ai-recommendation-notice"
          />
          <TermsAgreementRow
            isChecked={terms[4].isChecked}
            onChecked={() => handleCheck(terms[4].index)}
            title="마케팅 수신 동의 (선택)"
            to="../marketing-preferences"
          />
        </div>
        <div className="pt-[159px]">
          <Button
            text={`다음`}
            type="button"
            disabled={!isValid()}
            onClick={() => navigate("../family-create")}
          />
        </div>
      </div>
    </>
  );
}
