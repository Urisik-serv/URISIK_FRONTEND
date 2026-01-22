import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";
import TermDetailList from "../../components/terms/TermDetailList";

export default function TermsOfService() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[24px] mx-auto">
        <div className="text-xl font-semibold tracking-[2px] text-primary-700">
          서비스 이용 약관
        </div>
        <Term
          title="1. 목적"
          content="본 약관은 우리’식이 제공하는 가족 단위 맞춤형 식단 관리 서비스의 이용 조건, 절차 및 회원과 회사 간의 권리와 의무를 규정함을 목적으로 합니다."
        />
        <Term
          title="2. 용어의 정의"
          content="본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
서비스: 우리’식 모바일 애플리케이션 및 관련 기능 일체를 말합니다.
회원: 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
가족: 회원이 생성한 가족 단위 그룹을 말합니다.
가족 관리자: 가족을 생성하고 가족 구성원을 초대·관리할 수 있는 권한을 가진 회원을 말합니다.
콘텐츠: 식단, 메뉴, 레시피, 추천 결과 등 서비스 내에서 제공되는 모든 정보를 말합니다."
        />
        <Term
          title="3. 회원 가입 및 계정 관리"
          content={
            <ol className="list-decimal list-outside pl-[16px]">
              <li>
                회원 가입은 카카오, 구글 등 소셜 로그인을 통해 이루어집니다.
              </li>
              <li>회원은 원칙적으로 1인 1계정만을 사용할 수 있습니다.</li>
              <li>
                가족 관리자는 가족 구성원의 추가 및 삭제에 대한 관리 권한을
                가집니다.
              </li>
            </ol>
          }
        />
        <Term
          title="4. 서비스 제공 범위"
          content={
            <div className="flex flex-col gap-[8px]">
              <div>
                <div>회사는 다음과 같은 서비스를 제공합니다.</div>
                <ul>
                  <TermDetailList content="가족 프로필 및 알레르기 정보 관리 기능" />
                  <TermDetailList content="식사 기호를 반영한 식단 추천 기능" />
                  <TermDetailList content="대체 식재료 및 레시피 정보 제공" />
                  <TermDetailList content="식단 기록 및 개인화 추천 기능" />
                </ul>
              </div>
              <div>
                <div className="text-black text-[16px] font-medium leadint-[24px]">
                  ⚠ 중요 고지
                </div>
                <div>
                  본 서비스는 의료, 치료 또는 진단을 목적으로 하지 않으며, 전문
                  의료인의 판단을 대체하지 않습니다.
                </div>
              </div>
            </div>
          }
        />
        <Term
          title="5. 이용 제한"
          content={
            <div>
              <div>회원은 다음 각 호에 해당하는 행위를 하여서는 안 됩니다.</div>
              <ul>
                <TermDetailList content="허위 정보를 입력하는 행위" />
                <TermDetailList content="타인의 정보를 무단으로 등록하거나 사용하는 행위" />
                <TermDetailList content="서비스 운영을 방해하거나 정상적인 이용을 저해하는 행위" />
                <TermDetailList content="회사는 위 행위가 확인될 경우 서비스 이용을 제한할 수 있습니다." />
              </ul>
            </div>
          }
        />
        <Term
          title="6. 서비스 변경 및 중단"
          content="회사는 서비스의 일부 또는 전부를 변경할 수 있으며, 변경 사항이 있을 경우 사전에 공지합니다."
        />
        <Term
          title="7. 책임 제한 (면책 조항)"
          content={
            <ol className="list-decimal pl-[16px]">
              <li>
                알레르기 반응은 개인차가 있으며, 서비스의 추천 결과가 모든
                알레르기 반응을 완전히 예방함을 보장하지 않습니다.
              </li>
              <li>
                최종적인 식재료 선택, 조리 및 섭취에 대한 책임은 회원에게
                있습니다.
              </li>
            </ol>
          }
        />
      </div>
    </>
  );
}
