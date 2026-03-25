import Button from "../../components/common/Button";
import PublicHeader from "../../components/header/PublicHeader";
import { useEffect, useState } from "react";
import type {
  CreateMealPlan,
  DayOfWeek,
  SlotItem,
  SlotRequest,
} from "../../types/meal-plan";
import { postConfirmMealPlan, postCreateMealPlans } from "../../api/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import { changeAdditionalProp } from "../../utils/changeAdditionalProp";
import AlertModal from "../../components/common/AlertModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getNextMonday, getThisMonday } from "../../utils/date";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";
import { useProfileStore } from "../../stores/use-profile-store";
import CalendarChipS from "../../components/chip/CalendarChip/CalendarChipS";
import Background from "../../assets/icons/member-meal-background.svg";
import CalendarChipM from "../../components/chip/CalendarChip/CalendarChipM";
import MenuChip from "../../components/chip/MenuChip";
import TryAgain from "../../assets/icons/try-again.svg";

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
                    size="Btn_L"
                    variant="primary"
                    type="button"
                    className="w-[343px]"
                    onClick={handleCreate}
                  >
                    <span className="text-xl font-semibold leading-[22px]">
                      식단 생성
                    </span>
                  </Button>
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

type ChooseWeekProps = {
  mealTime: "점심" | "저녁";
  onChangeSelected: (slots: SlotRequest[]) => void;
};

const week: { label: string; value: DayOfWeek }[] = [
  { label: "월", value: "MONDAY" },
  { label: "화", value: "TUESDAY" },
  { label: "수", value: "WEDNESDAY" },
  { label: "목", value: "THURSDAY" },
  { label: "금", value: "FRIDAY" },
  { label: "토", value: "SATURDAY" },
  { label: "일", value: "SUNDAY" },
];

function ChooseWeek({ mealTime, onChangeSelected }: ChooseWeekProps) {
  const mealType = mealTime === "점심" ? "LUNCH" : "DINNER";

  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);

  const toggleDay = (day: DayOfWeek) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  useEffect(() => {
    const slots: SlotRequest[] = selectedDays.map((d) => ({
      dayOfWeek: d,
      mealType,
    }));
    onChangeSelected(slots);
  }, [selectedDays, mealType, onChangeSelected]);

  return (
    <div>
      <p className="text-[18px] font-medium">{mealTime} 식사</p>
      <div className="flex gap-3 pt-3">
        {week.map((day, idx) => (
          <CalendarChipS
            key={idx}
            text={day.label}
            type="select"
            isSelect={selectedDays.includes(day.value)}
            onClick={() => toggleDay(day.value)}
          />
        ))}
      </div>
    </div>
  );
}

//방장이 아닌 가족원이 이 페이지에 진입했을 때
function MemberMealPlanView() {
  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <p className="font-semibold text-primary-700 text-[14px] pb-4">
        방장이 식단을 생성하고 있어요.
      </p>
      <p className="font-medium text-[#4d4d4d] text-[18px] text-center whitespace-pre-line pb-10">
        가족원의 위시리스트를 기반으로 {"\n"}다음주 식단이 생성돼요.
      </p>
      <img src={Background} alt="가족원 식단화면 배경 아이콘" />
    </div>
  );
}

//식단 생성 결과
type MealPlanResultProps = {
  mealPlanId: number;
  onClick: () => void;
  weekParam: string | null;
  isLoading: boolean;
};

type mealPlanResponse = Record<string, SlotItem[]>;
const dayKor: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

function MealPlanResult({
  mealPlanId,
  onClick,
  weekParam,
  isLoading,
}: MealPlanResultProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const response = sessionStorage.getItem("mealPlan");
  if (isLoading) return null;
  if (!response) {
    toast.error("올바른 접근이 아닙니다. 식단 생성부터 해주세요!");
    return;
  }
  const data = JSON.parse(response) as mealPlanResponse;

  const handleButton = () => {
    setIsOpen(true);
  };
  const { familyRoomId } = useFamilyStore.getState();

  const handleClick = async () => {
    try {
      if (familyRoomId == null) {
        toast.error("familyRoomId 없음");
        return;
      }
      await postConfirmMealPlan({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
      });
    } catch (error) {
      alert("주간 식단 확정 실패" + error);
    } finally {
      if (weekParam === "THIS") {
        navigate(`/meal-plan?tab=THIS`);
      } else {
        navigate(`/meal-plan?tab=NEXT`);
      }
    }
  };
  return (
    <div>
      {isOpen && (
        <AlertModal
          title=""
          boldContent={`생성을 완료하시겠어요?`}
          mediumContent={`완료된 식단표는 [다음주 식단]에 \n저장됩니다.`}
          buttonText="확인"
          outsideText="탭해서 닫기"
          onClick={handleClick}
          handleModal={() => setIsOpen(false)}
        />
      )}
      <p className="pl-4 pt-6 font-semibold text-[24px] text-gray-800 pb-4 whitespace-pre-line">
        우리가족을 위한 식단표가 {"\n"}생성되었어요.
      </p>
      <div className="flex justify-end pr-[14px]">
        <button
          className="flex gap-1 p-[10px] bg-gray-200 rounded-lg font-medium text-[16px] cursor-pointer"
          onClick={onClick}
        >
          <img src={TryAgain} alt="다시 생성하기 아이콘" />
          <span className="shrink-0">다시 생성하기</span>
        </button>
      </div>
      <div className="flex gap-2 pt-12 pb-[27px] overflow-x-auto pr-4">
        <div className="flex flex-col items-center gap-3 font-medium text-gray-500 text-[14px]">
          <CalendarChipM text="" />
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            점심
          </p>
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            저녁
          </p>
        </div>
        {Object.entries(data).map(([day, slots]) => {
          const date = dayKor[day] ?? day;
          const lunch = slots.find((slot) => slot.mealType === "LUNCH");
          const dinner = slots.find((slot) => slot.mealType === "DINNER");
          return (
            <div className="flex flex-col items-center gap-3" key={day}>
              <CalendarChipM text={date} />
              {lunch ? (
                <MenuChip text={lunch.title} key="slot" />
              ) : (
                <div className="w-[75px] h-[82px]" />
              )}
              {dinner ? (
                <MenuChip text={dinner.title} key="slot" />
              ) : (
                <div className="w-[75px] h-[82px]" />
              )}
            </div>
          );
        })}
      </div>
      <div className="w-full max-w-[400px] fixed left-1/2 -translate-x-1/2 bottom-11 flex gap-3 px-4 font-semibold text-[20px]">
        <button
          className="w-full h-14 rounded-xl cursor-pointer text-primary-700 border border-primary-700"
          onClick={() => navigate(`/meal-plan/edit?week=${weekParam}`)}
        >
          수정
        </button>
        <button
          className="w-full h-14 rounded-xl cursor-pointer bg-primary-700 text-white"
          onClick={handleButton}
        >
          완료
        </button>
      </div>
    </div>
  );
}
