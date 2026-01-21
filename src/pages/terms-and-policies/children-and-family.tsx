import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";

export default function ChildrenAndFamily() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[24px] mx-auto">
        <div className="text-xl font-semibold tracking-[2px] text-primary-700">
          아동·가족 정보 조항
        </div>
        <Term
          title="1. 아동 정보 보호"
          content={
            <div>
              만 14세 미만 아동의 정보는 보호자 계정 하에서만 등록할 수
              있습니다.
              <br />
              아동은 단독으로 회원 가입을 할 수 없습니다.
              <br />
              보호자는 아동 정보 입력 및 관리에 대한 책임을 집니다.
            </div>
          }
        />
        <Term
          title="2. 가족 정보 공유"
          content={
            <div>
              가족 초대는 가족 관리자만 할 수 있습니다.
              <br />
              초대를 수락한 경우, 해당 가족 정보에 접근하고 공유하는 것에 동의한
              것으로 간주합니다.
            </div>
          }
        />
      </div>
    </>
  );
}
