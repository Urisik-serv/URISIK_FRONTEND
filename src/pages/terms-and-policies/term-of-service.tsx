import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";

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
          title="회원 가입 및 계정 관리"
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
      </div>
    </>
  );
}
