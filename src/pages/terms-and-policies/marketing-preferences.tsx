import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";

export default function MarketingPreferences() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[24px] mx-auto">
        <div className="text-xl font-semibold tracking-[2px] text-primary-700">
          마케팅 수신 동의
        </div>
        <Term
          title="1. 수신 항목"
          content={
            <div>
              이벤트 및 프로모션 안내
              <br />
              신규 기능 및 콘텐츠 안내
            </div>
          }
        />
        <Term
          title="2. 정책"
          content={
            <div>
              마케팅 수신에 동의하지 않아도 서비스 이용에는 제한이 없습니다.
              <br />
              회원은 언제든지 설정 화면을 통해 동의를 철회할 수 있습니다.
            </div>
          }
        />
      </div>
    </>
  );
}
