import Button from "../../components/common/Button";
import ChooseWeek from "../../components/meal-plan/ChooseWeek";
import MemberMealPlanView from "../../components/meal-plan/MemberMealPlanView";
import PublicHeader from "../../components/header/PublicHeader";
import { useState } from "react";
import type { CreateMealPlan, SlotRequest } from "../../types/meal-plan";
import { postCreateMealPlans } from "../../api/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import MealPlanResult from "../../components/meal-plan/MealPlanResult";
import { changeAdditionalProp } from "../../utils/changeAdditionalProp";
import AlertModal from "../../components/common/AlertModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getNextMonday, getThisMonday } from "../../utils/date";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { useProfileStore } from "../../stores/use-profile-store";

const MealPlanCreatePage = () => {
  const [step, setStep] = useState<"create" | "result">("create");
  const [isOpen, setIsOpen] = useState(false);
  const isLeader = useProfileStore().isLeader;
  const { familyRoomId } = useFamilyStore.getState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const weekParam = searchParams.get("week");

  const [mealPlanId, setMealPlanId] = useState<number>(0);
  const [lunchSlots, setLunchSlots] = useState<SlotRequest[]>([]);
  const [dinnerSlots, setDinnerSlots] = useState<SlotRequest[]>([]);

  //const [regenerate, setRegenerate] = useState(true);
  const regenerate = true;

  const handleCreate = async () => {
    if (step === "create") setStep("result");

    const body: CreateMealPlan = {
      weekStartDate: weekParam === "THIS" ? getThisMonday() : getNextMonday(),
      selectedSlots: [...lunchSlots, ...dinnerSlots],
      regenerate: regenerate,
    };

    setIsLoading(true); //로딩 시작
    try {
      if (familyRoomId == null) {
        alert("familyRoomId 없음");
        return;
      }
      const response = await postCreateMealPlans({
        familyRoomId: familyRoomId,
        createMeal: body,
      });
      setMealPlanId(response.result.mealPlanId);
      sessionStorage.setItem(
        "mealPlan",
        JSON.stringify(changeAdditionalProp(response.result.slots, "DAY")),
      );
      sessionStorage.setItem(
        "mealPlanId",
        JSON.stringify(response.result.mealPlanId),
      );
    } catch (error: any) {
      if (error.response?.data?.code === "MEAL_PLAN_409") {
        toast.error("이미 생성된 다음주 식단이 있어요");
      } else {
        toast.error(error.response?.data?.message);
      }
      setStep("create");
      navigate(`/`);
    } finally {
      setIsLoading(false); // 로딩 끝
    }
  };

  return (
    <div>
      {!isLeader ? (
        <>
          <PublicHeader title={"식단 생성"} />
          <MemberMealPlanView />
        </>
      ) : (
        <>
          {step === "create" && (
            <>
              <PublicHeader title={"식단 생성"} />
              <div className="px-4 pt-6">
                <p className="font-semibold text-[24px] text-[#333333] pb-2">
                  요일별 식사 횟수를 선택해요.
                </p>
                <p className="font-medium text-[16px] text-[#929292] pb-11 whitespace-pre-line">
                  가족원의 위시리스트를 기반으로 {"\n"} 다음주 식단을 생성돼요.
                </p>
                <div className="flex flex-col gap-5">
                  <ChooseWeek
                    mealTime="점심"
                    onChangeSelected={setLunchSlots}
                  />
                  <ChooseWeek
                    mealTime="저녁"
                    onChangeSelected={setDinnerSlots}
                  />
                </div>
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center pb-10">
                  <Button
                    text="식단 생성"
                    type="button"
                    onClick={() => handleCreate()}
                  />
                </div>
              </div>
            </>
          )}
          {step === "result" && (
            <div className="flex flex-col min-h-[100dvh]">
              <PublicHeader
                title={"식단 생성"}
                onClick={() => setIsOpen(true)}
              />
              {isOpen && (
                <AlertModal
                  title=""
                  boldContent="생성을 중단하시겠어요?"
                  mediumContent="생성 도중인 식단표는 사라집니다."
                  buttonText="확인"
                  outsideText="탭해서 닫기"
                  onClick={() => navigate(`/`)}
                  handleModal={() => setIsOpen(false)}
                />
              )}
              {isLoading ? (
                <div className="flex flex-1 h-full justify-center">
                  <LoadingSpinner text="AI가 사용자에 맞춰서 식단을 생성하고 있어요" />
                </div>
              ) : (
                <MealPlanResult
                  mealPlanId={mealPlanId}
                  onClick={handleCreate}
                  weekParam={weekParam}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MealPlanCreatePage;
