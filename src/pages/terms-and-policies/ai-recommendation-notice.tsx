import PublicHeader from "../../components/header/PublicHeader";
import Term from "../../components/terms/Term";

export default function AiRecommendationNotice() {
  return (
    <>
      <PublicHeader title={"약관 및 정책"} />
      <div className="pt-[24px] w-[343px] flex flex-col gap-[24px] mx-auto">
        <div className="text-xl font-semibold tracking-[2px] text-primary-700">
          AI 추천 고지
        </div>
        <Term
          content={
            <div>
              <div>
                회사는 사용자가 입력한 가족 정보, 알레르기 정보, 식사 기호 및
                서비스 이용 기록을 기반으로 자동화된 추천 시스템(AI)을
                활용합니다
              </div>
              <ol className="pl-2">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>AI 추천 결과는 참고용 정보입니다.</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    추천 품질 개선을 위해 이용 데이터가 분석될 수 있습니다.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    분석 데이터는 개인을 식별할 수 없는 형태로 처리됩니다.
                  </span>
                </li>
              </ol>
            </div>
          }
        />
      </div>
    </>
  );
}
