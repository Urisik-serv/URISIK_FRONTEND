import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";

export default function PrivacyPolicy() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[24px] mx-auto">
        <div className="text-xl font-semibold tracking-[2px] text-gray-800">
          개인정보 처리 방침
        </div>
        <Term
          title="1. 수집하는 개인정보"
          content={
            <div>
              ① 필수 정보
              <br />
              소셜 로그인 식별자(ID)
              <br />
              이메일 주소
              <br />
              닉네임
              <br />
              ② 선택 정보
              <br />
              가족 구성 정보(역할, 연령대)
              <br />
              알레르기 정보
              <br />
              식사 기호 및 비선호 재료
              <br />
              후기 및 위시리스트 데이터
            </div>
          }
        />
        <Term
          title="2. 개인정보 수집 목적"
          content={
            <div>
              <div>회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다.</div>
              <ul className="list-inside">
                <li>• 맞춤형 식단 추천 제공</li>
                <li>• 가족 프로필 관리</li>
                <li>• 서비스 품질 개선 및 개인화 기능 제공</li>
              </ul>
            </div>
          }
        />
        <Term
          title="3. 개인정보 보유 및 이용기간"
          content={
            <ol className="list-outside list-decimal pl-[16px]">
              <li>회원 탈퇴 시 개인정보는 즉시 삭제합니다.</li>
              <li>
                관련 법령에 따라 보관이 필요한 정보는 해당 법령에서 정한 기간
                동안 보관합니다.
              </li>
            </ol>
          }
        />
        <Term
          title="4. 개인정보의 제3자 제공"
          content={
            <ol className="list-decimal pl-[16px]">
              <li>회사는 원칙적으로 개인정보를 제3자에게 제공하지 않습니다.</li>
              <li>제3자 제공이 필요한 경우 사전에 회원의 동의를 받습니다.</li>
            </ol>
          }
        />
        <Term
          title="5. 이용자의 권리"
          content="회원은 언제든지 개인정보의 열람, 수정 및 삭제를 요청할 수 있으며, 동의 철회 및 회원 탈퇴를 할 수 있습니다."
        />
      </div>
    </>
  );
}
