import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import ChooseWeek from "../../components/meal-plan/ChooseWeek";
import MemberMealPlanView from "../../components/meal-plan/MemberMealPlanView";
import PublicHeader from "../../components/header/PublicHeader";
import { useState } from "react";
import type { CreateMealPlan, SlotRequest } from "../../types/meal-plan";
import { postCreateMealPlans } from "../../api/meal-plan";
import useGetFamilyRoom from "../../hooks/queries/use-get-family-room";

const MealPlanCreatePage = () => {
  const [step, setStep] = useState<"create" | "result">("create");
  const isMember = false; // true로 바꾸면 가족원 화면을 볼 수 있습니다.
  const navigate = useNavigate();

  //날짜 계산
  const formatYMD = (d: Date) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  //다음주 월요일 날짜를 계산
  const getNextMondayYMD = (baseDate = new Date()) => {
    const d = new Date(baseDate);
    d.setHours(0, 0, 0, 0);

    const day = d.getDay(); // 0=Sun, 1=Mon, ... 6=Sat
    // 다음 주 월요일까지 남은 일수:
    // Mon(1)->7, Tue(2)->6, ... Sun(0)->1
    const daysUntilNextMonday = day === 0 ? 1 : 8 - day;

    d.setDate(d.getDate() + daysUntilNextMonday);
    return formatYMD(d);
  };

  const [lunchSlots, setLunchSlots] = useState<SlotRequest[]>([]);
  const [dinnerSlots, setDinnerSlots] = useState<SlotRequest[]>([]);

  const [regenerate, setRegenerate] = useState(false);

  const { data } = useGetFamilyRoom();

  const handleCreate = async () => {
    const body: CreateMealPlan = {
      weekStartDate: getNextMondayYMD(),
      selectedSlots: [...lunchSlots, ...dinnerSlots],
      regenerate: regenerate,
    };
    console.log(body);
    try {
      if (data?.familyRoomId == null) {
        console.log("familyRoomId 없음");
        return;
      }
      await postCreateMealPlans({
        familyRoomId: data?.familyRoomId,
        createMeal: body,
      });
      console.log(body);
    } catch (error) {
      console.log("주간 식단 생성 실패", error);
    }
  };
  return (
    <div>
      <PublicHeader title={"식단 생성"} />
      {isMember ? (
        <MemberMealPlanView />
      ) : (
        <>
          {step === "create" && (
            <div className="px-4 pt-6">
              <p className="font-semibold text-[24px] text-[#333333] pb-2">
                요일별 식사 횟수를 선택해요.
              </p>
              <p className="font-medium text-[16px] text-[#929292] pb-11 whitespace-pre-line">
                가족원의 위시리스트를 기반으로 {"\n"} 다음주 식단을 생성돼요.
              </p>
              <div className="flex flex-col gap-5">
                <ChooseWeek mealTime="점심" onChangeSelected={setLunchSlots} />
                <ChooseWeek mealTime="저녁" onChangeSelected={setDinnerSlots} />
              </div>
              <div className="fixed bottom-11">
                <Button
                  text="식단 생성"
                  type="button"
                  onClick={() => handleCreate()}
                />
              </div>
            </div>
          )}
          {step === "result" && <></>}
        </>
      )}
    </div>
  );
};

export default MealPlanCreatePage;
