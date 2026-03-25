import { useEffect, useState } from "react";
import HomeHeader from "../../components/header/HomeHeader";
import { useNavigate, useSearchParams } from "react-router-dom";
import selectedSun from "../../assets/icons/sun-selected.svg";
import unselectedSun from "../../assets/icons/sun-unselected.svg";
import selectedMoon from "../../assets/icons/moon-selected.svg";
import unselectedMoon from "../../assets/icons/moon-unselected.svg";
import useGetTodayMealPlan from "../../hooks/queries/use-get-today-meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import EmptyState from "../../components/common/EmptyState";
import { LoadingSpinner } from "../../components/common/LoadingSpinner";
import IngredientAndRecipe from "../../components/common/IngredientAndRecipe";
import Button from "../../components/common/Button";
import type { TodayMeal } from "../../types/meal-plan";
import { useProfileStore } from "../../stores/use-profile-store";
import { getNextMonday, getThisMonday, getWeekOfMonth } from "../../utils/date";
import useGetWeekMealPlan from "../../hooks/queries/use-get-week-meal";
import { changeAdditionalProp } from "../../utils/changeAdditionalProp";
import CalendarChipS from "../../components/chip/CalendarChip/CalendarChipS";
import DateMenuList from "../../components/meal-plan/DateMenuList";
import usePostReview from "../../hooks/mutations/use-post-review";
import type { createReview } from "../../types/review";
import toast from "react-hot-toast";
import AlertModal from "../../components/common/AlertModal";
import UnselectedStar from "../../assets/icons/star-unselected.svg";
import SelectedStar from "../../assets/icons/star-selected.svg";
import X from "../../assets/icons/x-icon.svg";

const MealPlanPage = () => {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [tab, setTab] = useState<"오늘의 식단" | "이번주 식단" | "다음주 식단">(
    tabParam === "NEXT"
      ? "다음주 식단"
      : tabParam === "THIS"
        ? "이번주 식단"
        : "오늘의 식단",
  );
  const [todayTab, setTodayTab] = useState<"점심" | "저녁">("점심");
  const { familyRoomId } = useFamilyStore.getState();

  const {
    data: todayData,
    isError,
    isLoading,
  } = useGetTodayMealPlan(familyRoomId);
  useEffect(() => {
    if (todayData?.result?.meals.length == 1) {
      if (todayData.result.meals[0].mealType === "DINNER") setTodayTab("저녁");
    }
  }, [todayData?.result?.meals]);

  const lunchData = todayData?.result.meals.find(
    (data) => data.mealType === "LUNCH",
  );
  const dinnerData = todayData?.result.meals.find(
    (data) => data.mealType === "DINNER",
  );
  const tabData = todayTab === "점심" ? lunchData : dinnerData;
  return (
    <div>
      <HomeHeader />
      <div className="p-4 mt-1">
        <div className="w-full flex font-medium text-[14px] h-[42px]">
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "오늘의 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("오늘의 식단")}
          >
            오늘
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "이번주 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("이번주 식단")}
          >
            이번주
          </button>
          <button
            className={`flex-1 cursor-pointer border-b-1 ${tab === "다음주 식단" ? "bg-primary-700 border-primary-700 rounded-t-lg text-white" : "bg-white text-gray-300 border-gray-300"}`}
            onClick={() => setTab("다음주 식단")}
          >
            다음주
          </button>
        </div>
        {tab === "오늘의 식단" && (
          <>
            <div className="flex pt-4 w-full font-[14px] font-medium">
              <button
                className={`py-2 w-full rounded-lg flex flex-col items-center ${todayTab === "점심" ? "bg-primary-100 text-primary-700" : "text-gray-350 cursor-pointer"}`}
                onClick={() => setTodayTab("점심")}
              >
                <img
                  src={todayTab === "점심" ? selectedSun : unselectedSun}
                  className="size-5"
                />
                점심
              </button>
              <button
                className={`py-2 w-full rounded-lg flex flex-col items-center ${todayTab === "저녁" ? "bg-primary-100 text-primary-700" : "text-gray-350 cursor-pointer"}`}
                onClick={() => setTodayTab("저녁")}
              >
                <img
                  src={todayTab === "저녁" ? selectedMoon : unselectedMoon}
                  className="size-5"
                />
                저녁
              </button>
            </div>
            {isLoading ? (
              <div className="w-full pt-60">
                {" "}
                <LoadingSpinner />
              </div>
            ) : (
              <>
                {isError || !tabData ? (
                  <div className="pt-27">
                    <EmptyState text={`${todayTab}식단이 생성되지 않았어요.`} />
                  </div>
                ) : (
                  <TodayMealTab key={todayTab} data={tabData} />
                )}
              </>
            )}
          </>
        )}
        {tab == "이번주 식단" && (
          <WeekMealTab key="THISWEEK" weekType="THISWEEK" />
        )}
        {tab == "다음주 식단" && (
          <WeekMealTab key="NEXTWEEK" weekType="NEXTWEEK" />
        )}
      </div>
    </div>
  );
};

export default MealPlanPage;

// 오늘의 식단 탭
function TodayMealTab({ data }: { data: TodayMeal }) {
  const [isDone, setIsDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="flex justify-between items-center pt-3">
        {isOpen && (
          <ReviewModal
            recipeId={data.id}
            onClick={handleClose}
            type={data.type}
          />
        )}
        <div>
          {/* <p className="font-normal text-[16px] leading-[1.5]">우유대신,</p> */}
          {/*현재 부연설명이 들어오고 있지 않아서 주석 처리 */}
          <p className="font-semibold text-[18px] tracking-[0.01em] text-gray-600">
            {data.title.split(" ").map((title, idx) => (
              <span key={idx}>
                {title} {idx % 2 === 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        <img
          src={data.imageUrl}
          alt={`${data.title} 이미지`}
          className="w-41 h-29 object-cover rounded-lg"
        />
      </div>
      {!data.isReviewed && (
        <div className="pt-6">
          <Button
            onClick={isDone ? () => setIsOpen(true) : () => setIsDone(true)}
            size="Btn_L"
            variant="primary"
            type="button"
            className="w-[343px]"
          >
            {isDone ? "리뷰 작성" : "식사 완료"}
          </Button>
        </div>
      )}
      <div className="pt-11 pb-29">
        <IngredientAndRecipe
          ingredients={data.ingredients}
          step={data.recipeSteps}
        />
      </div>
    </>
  );
}

// 이번주/다음주 탭
function WeekMealTab({ weekType }: { weekType: "THISWEEK" | "NEXTWEEK" }) {
  const { familyRoomId } = useFamilyStore();
  const isLeader = useProfileStore().isLeader;
  const baseDate = new Date();
  const date =
    weekType === "THISWEEK" ? getThisMonday(baseDate) : getNextMonday(baseDate); //이번주/다음주 시작 월요일 날짜
  const { data, isError, isLoading } = useGetWeekMealPlan(familyRoomId!, date);

  const navigate = useNavigate();
  if (isError) {
    return (
      <div className="pt-43">
        {isLeader ? (
          <EmptyState
            text="아직 식단이 생성되지 않았어요"
            buttonText="식단 생성"
            onClick={() => navigate(`/meal-plan/create?week=${weekType}`)}
          />
        ) : (
          <EmptyState
            text="아직 식단이 생성되지 않았어요"
            primaryText="방장이 식단을 생성하고 있어요"
          />
        )}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full pt-60">
        <LoadingSpinner text="식단을 불러오고 있어요..." />
      </div>
    );
  }
  const weekData = changeAdditionalProp(data?.result.slots || {}, "WEEK");
  const listHeaderDate =
    date + "~" + date[5] + date[6] + "." + (Number(date[8] + date[9]) + 6);
  const { month, weekKor } = getWeekOfMonth(new Date(date));

  const dayKorMap: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };
  const dayNames = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const todayIdx = new Date().getDay();

  const adjustedIdx =
    weekType === "THISWEEK" ? (todayIdx === 0 ? 6 : todayIdx - 1) : 0;

  //오늘~앞으로 날
  const futureDays = dayNames.slice(adjustedIdx).map((day) => ({
    dayKor: dayKorMap[day],
    meals: weekData[day] || [],
  }));

  //지난 날
  const pastDays = dayNames.slice(0, adjustedIdx).map((day) => ({
    dayKor: dayKorMap[day],
    meals: weekData[day] || [],
  }));
  return (
    <>
      <div className="pt-[33px] pb-[11px]">
        <div className="flex px-[10px] py-1 rounded-lg text-4 gap-2 bg-white">
          <p className="font-semibold text-gray-700 text-[16px]">{`${month}월 ${weekKor}`}</p>
          <p className="font-medium text-gray-500 text-[16px]">
            {listHeaderDate}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 pb-30">
        {futureDays.map((day) => {
          if (day.meals.length > 0) {
            return (
              <div key={day.dayKor} className="flex gap-3">
                <CalendarChipS text={day.dayKor} type="primary" />
                <DateMenuList isSelect={true} data={day.meals} />
              </div>
            );
          }
        })}
        {pastDays.map((day) => {
          if (day.meals.length > 0) {
            return (
              <div key={day.dayKor} className="flex gap-3">
                <CalendarChipS text={day.dayKor} type="gray" />
                <DateMenuList isSelect={false} data={day.meals} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

//리뷰 모달
type ReviewModalProps = {
  recipeId: number;
  onClick: () => void;
  type: "TRANSFORMED_RECIPE" | "RECIPE";
};

type Preference = boolean | null;

function ReviewModal({ recipeId, onClick, type }: ReviewModalProps) {
  const [preference, setPreference] = useState<Preference>(null);
  const star = [1, 2, 3, 4, 5];
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handlebutton = (select: Preference) => {
    if (select == preference) {
      setPreference(null);
    } else {
      setPreference(select);
    }
  };

  const onModalClick = () => {
    setIsOpen(false);
    onClick();
  };

  const { mutate } = usePostReview();

  const handleSubmitReview = ({
    recipeId,
    score,
    isFavorite,
  }: createReview) => {
    mutate(
      { recipeId, score, isFavorite, type },
      {
        onSuccess: () => {
          setIsOpen(true);
        },
        onError: (e: any) => {
          if (!score) {
            toast.error("별을 클릭해주세요");
            return;
          }
          toast.error(e.response?.data?.message);
          onClick();
        },
      },
    );
  };
  return (
    <div className="fixed inset-0 z-30 flex justify-center items-end">
      {isOpen && (
        <AlertModal
          boldContent="리뷰 등록 완료!"
          mediumContent={`사용자님의 소중한 리뷰를\n기록했어요.`}
          buttonText="확인"
          onClick={onModalClick}
        />
      )}
      <div className="bg-white rounded-t-2xl shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.25)] w-[400px] flex flex-col gap-6 items-center text-center">
        <button
          className="pt-[10px] cursor-pointer flex justify-center items-center"
          onClick={onClick}
        >
          <img src={X} alt="닫기버튼" className="size-6" />
        </button>
        <div className="font-semibold">
          <p className="text-[20px] pb-6">오늘의 메뉴는 어떠셨나요</p>
          <div className="pb-4 flex justify-center">
            {star.map((idx) => (
              <button
                className="size-[58px] flex justify-center items-center cursor-pointer"
                key={idx}
                onClick={() => setScore(idx)}
              >
                <img
                  src={idx <= score ? SelectedStar : UnselectedStar}
                  alt="별점"
                />
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-[10px]">
            <button
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === false ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton(false)}
            >
              내 취향은 아니에요
            </button>
            <button
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === true ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton(true)}
            >
              또 먹고 싶어요
            </button>
          </div>
        </div>
        <div className="w-full p-[10px] flex justify-center">
          <Button
            size="Btn_L"
            variant="primary"
            type="button"
            className="w-[343px]"
            onClick={() => {
              const reviewData: createReview = {
                recipeId,
                score,
              };
              if (preference !== null) {
                reviewData.isFavorite = preference;
              }
              handleSubmitReview(reviewData);
            }}
          >
            <span className="text-xl font-semibold leading-[22px]">등록</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
