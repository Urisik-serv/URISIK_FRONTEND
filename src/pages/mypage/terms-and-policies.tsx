import PublicHeader from "../../components/header/PublicHeader";
import TermsBlock from "../../components/mypage/TermsBlock";

export default function TermsAndPolicies() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[12px] mx-auto">
        <TermsBlock title="서비스 이용 약관" to={"../../terms-of-service"} />
        <TermsBlock title="개인 정보 처리 방침" to={"../../privacy-policy"} />
        <TermsBlock
          title="아동·가족 정보 조항"
          to={"../../children-and-family"}
        />
        <TermsBlock
          title="AI 추천 고지 "
          to={"../../ai-recomendation-notice"}
        />
        <TermsBlock
          title="마케팅 수신 동의 (선택)"
          to={"../../marketing-preference"}
        />
      </div>
    </>
  );
}
