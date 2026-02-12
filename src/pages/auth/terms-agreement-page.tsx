import Button from "../../components/common/Button";
import PublicHeader from "../../components/header/PublicHeader";
import TermsAgreementRow from "../../components/terms/TermsAgreementRow";
import CheckBoxEmpty from "../../assets/icons/check-box-empty.svg";
import checkBox from "../../assets/icons/check-box.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Agree } from "../../types/member";
import { patchAgree } from "../../api/member";
import { useMutation } from "@tanstack/react-query";

export default function TermsAgreementPage() {
  const [terms, setTerms] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const navigate = useNavigate();

  const allChecked = terms.every(Boolean);

  const isValid = terms[0] && terms[1] && terms[2] && terms[3];

  const handleCheck = (index: number) => {
    setTerms((prev) => prev.map((term, i) => (i === index ? !term : term)));
  };

  const handleAllCheck = () => {
    setTerms(Array(5).fill(!allChecked));
  };

  const { mutate: agree, isPending: isAgreeing } = useMutation({
    mutationFn: patchAgree,
    onSuccess: () => {
      const redirect = localStorage.getItem("loginRedirect");

      if (redirect) {
        localStorage.removeItem("loginRedirect");
        navigate(redirect);
      } else {
        navigate("/family-create");
      }
    },
    onError: () => {
      alert("약관 동의 처리 중 오류가 발생했습니다.");
    },
  });

  const handleSubmit = () => {
    const request: Agree = {
      serviceTermsAgreed: terms[0],
      privacyPolicyAgreed: terms[1],
      familyInfoAgreed: terms[2],
      aiNoticeAgreed: terms[3],
      marketingOptIn: terms[4],
    };

    agree(request);
  };

  return (
    <div>
      <PublicHeader title={"약관 및 정책"} />
      <div className="flex flex-col px-[17px]">
        <div className="w-64 justify-start text-zinc-800 text-2xl font-medium font-['Wanted_Sans'] leading-9 pt-[24px]">
          서비스 이용을 위해
          <br />
          이용약관 동의가 필요해요
        </div>
        <div className="pt-[56px] flex flex-cols justify-center">
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
        <div className="pt-[40px] flex flex-col items-center">
          <TermsAgreementRow
            isChecked={terms[0]}
            onChecked={() => handleCheck(0)}
            title="서비스 이용 악관(필수)"
            to="../terms-of-service"
          />
          <TermsAgreementRow
            isChecked={terms[1]}
            onChecked={() => handleCheck(1)}
            title="개인 정보 처리 방침 (필수)"
            to="../privacy-policy"
          />
          <TermsAgreementRow
            isChecked={terms[2]}
            onChecked={() => handleCheck(2)}
            title="아동·가족 정보 조항 (필수)"
            to="../children-and-family"
          />
          <TermsAgreementRow
            isChecked={terms[3]}
            onChecked={() => handleCheck(3)}
            title="AI 추천 고지 (필수)"
            to="../ai-recommendation-notice"
          />
          <TermsAgreementRow
            isChecked={terms[4]}
            onChecked={() => handleCheck(4)}
            title="마케팅 수신 동의 (선택)"
            to="../marketing-preferences"
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center pb-10">
        <Button
          text={`다음`}
          type="button"
          disabled={!isValid || isAgreeing}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
