import { useEffect, useRef, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import CalendarChipM from "../../components/chip/CalendarChip/CalendarChipM";
import MenuChip from "../../components/chip/MenuChip";
import { useSearchParams } from "react-router-dom";
import {
  type Updates,
  type DayOfWeek,
  type MealType,
  type SlotItem,
} from "../../types/meal-plan";
import { useFamilyStore } from "../../stores/use-family-store";
import { patchEditMealPlans, postConfirmMealPlan } from "../../api/meal-plan";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import MenuList from "../../components/common/MenuList";
import Chevron from "../../components/common/icon/Chevron";
import AlertModal from "../../components/common/AlertModal";
import { useInView } from "react-intersection-observer";
import { useGetRecommendList } from "../../hooks/queries/use-get-recommendations";
import { useInfiniteQuery } from "@tanstack/react-query";
import { wishQueries } from "../../hooks/queries/wish-queries";

type mealPlanResponse = Record<string, SlotItem[]>;

const MealPlanEditPage = () => {
  const [updates, setUpdates] = useState<Updates[]>([]);
  const { familyRoomId } = useFamilyStore.getState();
  const mealPlanId = Number(sessionStorage.getItem("mealPlanId"));
  const navigate = useNavigate();

  //생성한 식단 가져오기
  const [mealPlan, setMealPlan] = useState<mealPlanResponse | null>(() => {
    const response = sessionStorage.getItem("mealPlan");
    if (!response) return null;

    try {
      return JSON.parse(response) as mealPlanResponse;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const response = sessionStorage.getItem("mealPlan");
    if (!response) {
      toast.error("올바른 접근이 아닙니다. 식단 생성부터 해주세요.");
      navigate("/");
    }
  }, [navigate]);

  const dayKor: Record<string, string> = {
    MONDAY: "월",
    TUESDAY: "화",
    WEDNESDAY: "수",
    THURSDAY: "목",
    FRIDAY: "금",
    SATURDAY: "토",
    SUNDAY: "일",
  };

  //수정하려고 하는 메뉴(선택된 메뉴)
  const [selected, setSelected] = useState<{
    day: string | null;
    mealType: MealType | null;
  }>({ day: null, mealType: null });

  //바텀 시트 열고 닫기
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const weekParam = searchParams.get("week");

  //바텀 시트가 열린 적이 없으면 최초 실행시에 자동으로 열리는 애니메이션
  const hasOpenedRef = useRef(false);
  useEffect(() => {
    if (selected.mealType !== null && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  //선택한 것 확인
  const handleSelect = (day: string, mealType: MealType) => {
    const isAlreadySelected =
      selected.day === day && selected.mealType === mealType;
    if (isAlreadySelected) {
      setSelected({ day: null, mealType: null });
    } else {
      setSelected({ day, mealType });
    }
  };

  //바꾸기 눌렀을 때 ui 수정/정보 저장
  const changeMenu = (
    id: number,
    title: string,
    type: "RECIPE" | "TRANSFORMED_RECIPE",
  ) => {
    if (!selected.day || !selected.mealType) return; //기존의 메뉴 선택x경우

    //ui
    setMealPlan((prev) => {
      if (!prev) return prev;
      const changeDay = selected.day as string;
      const changeSlot = prev[changeDay].map((slot) =>
        slot.mealType === selected.mealType ? { ...slot, title } : slot,
      ); //제목 교체

      return { ...prev, [changeDay]: changeSlot }; //선택한 슬롯만 제목 change
    });

    //update
    setUpdates((prev) => {
      const newUpdate: Updates = {
        selectedSlot: {
          mealType: selected.mealType as MealType,
          dayOfWeek: selected.day as DayOfWeek,
        },
        selectedRecipe: { type, id },
      }; //객체로 묶기
      const filter = prev.filter(
        (prev) =>
          !(
            prev.selectedSlot.dayOfWeek === selected.day &&
            prev.selectedSlot.mealType === selected.mealType
          ), // 이미 있는 경우 제외
      );
      return [...filter, newUpdate];
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    const updateList = updates;
    try {
      if (familyRoomId == null || mealPlanId == null) {
        return;
      }
      await patchEditMealPlans({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
        updates: updateList,
      });
      await postConfirmMealPlan({
        familyRoomId: familyRoomId,
        mealPlanId: mealPlanId,
      });
      sessionStorage.removeItem("mealPlan");
      navigate(`/meal-plan?tab=nextWeek`);
    } catch (e) {
      toast.error("다시 시도해주세요" + e);
    }
  };

  return (
    <div>
      <PublicHeader title={"식단 수정"} />
      <p className="pl-4 pt-6 font-semibold text-[24px] text-[#333333] pb-11 whitespace-pre-line">
        수정하고 싶은 요일을 선택하고,{"\n"}내가 원하는 메뉴로 바꿔요.
      </p>
      <div className="flex gap-2 pb-[27px] overflow-x-auto pr-4">
        <div className="flex flex-col items-center gap-3 font-medium text-gray-500 text-[14px]">
          <CalendarChipM text="" />
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            점심
          </p>
          <p className="pl-4 pr-2 flex items-center text-center shrink-0 h-[82px] whitespace-nowrap">
            저녁
          </p>
        </div>
        {mealPlan &&
          Object.entries(mealPlan).map(([day, slots]) => {
            const isDaySelected = selected.day === day;
            const isLunchSelected = selected.mealType === "LUNCH";
            const isDinnerSelected = selected.mealType === "DINNER";

            const date = dayKor[day] ?? day;
            const lunch = slots.find((slot) => slot.mealType === "LUNCH");
            const dinner = slots.find((slot) => slot.mealType === "DINNER");
            return (
              <div className="flex flex-col items-center gap-3" key={day}>
                <CalendarChipM text={date} isSelect={isDaySelected} />
                {lunch ? (
                  <MenuChip
                    text={lunch.title}
                    clickable={true}
                    isSelect={isDaySelected && isLunchSelected}
                    onClick={() => handleSelect(day, "LUNCH")}
                  />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
                {dinner ? (
                  <MenuChip
                    text={dinner.title}
                    clickable={true}
                    isSelect={isDaySelected && isDinnerSelected}
                    onClick={() => handleSelect(day, "DINNER")}
                  />
                ) : (
                  <div className="w-[75px] h-[82px]" />
                )}
              </div>
            );
          })}
      </div>
      <BottomSheet
        open={open}
        weekParam={weekParam}
        changeMenu={changeMenu}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default MealPlanEditPage;

//bottomSheet
type BottomSheetProps = {
  open: boolean;
  weekParam: string | null;
  changeMenu: (
    id: number,
    title: string,
    type: "RECIPE" | "TRANSFORMED_RECIPE",
  ) => void;
  onSubmit: () => void;
};
function BottomSheet({
  open,
  weekParam,
  changeMenu,
  onSubmit,
}: BottomSheetProps) {
  const [tab, setTab] = useState<"common" | "recommend">("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState<{
    id: number;
    title: string;
    type: "RECIPE" | "TRANSFORMED_RECIPE";
  } | null>(null);
  const navigate = useNavigate();
  //안전한 순 위시리스트 코드
  const { data: recommendList } = useGetRecommendList("안전한 순", undefined);

  //가족 위시리스트 코드
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const {
    data: familyWish,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(wishQueries.family(familyRoomId, 6));

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  useEffect(() => {
    if (selected !== null) return;
    if (tab === "common") {
      const first = familyWish?.pages?.[0];
      if (!first) return;
      setSelected({ id: first.id, title: first.title, type: first.type });
    } else {
      const first = recommendList?.recipes?.[0];
      if (!first) return;
      const recipeType = first.transformed ? "TRANSFORMED_RECIPE" : "RECIPE";
      setSelected({
        id: Number(first.id),
        title: first.title,
        type: recipeType,
      });
    }
  }, [tab, familyWish, recommendList, selected]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  //모달창 속 확인 버튼 눌렀을 때
  const handleButton = () => {
    if (weekParam === "THIS") {
      navigate(`/meal-plan?tab=THIS`);
    } else {
      navigate(`/meal-plan?tab=NEXT`);
    }
    onSubmit();
  };

  const handleChange = () => {
    if (!selected) {
      toast.error("교체할 메뉴를 선택해주세요");
      return;
    }
    changeMenu(selected.id, selected.title, selected.type);
    setSelected(null);
    setIsOpen(false);
  };

  return (
    <div className="max-w-[400px] fixed bottom-0 p-[10px] rounded-t-2xl shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.25)] overflow-hidden bg-white flex flex-col items-center">
      <div>
        {isModalOpen && (
          <AlertModal
            title=""
            boldContent={`수정을 중단하시겠어요?`}
            mediumContent={`완료된 식단표는 [다음주 식단]에 \n저장됩니다`}
            buttonText="확인"
            outsideText="탭해서 닫기"
            onClick={handleButton}
            handleModal={() => {
              setIsModalOpen(false);
            }}
          />
        )}

        <button
          className="flex items-center justify-center size-8 mb-3 cursor-pointer"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? (
            <Chevron rotate={180} color="black" size={32} />
          ) : (
            <Chevron rotate={0} color="black" size={32} />
          )}
        </button>
      </div>
      <div className="w-full flex font-semibold text-[18px] h-13">
        <button
          className={`flex-1 cursor-pointer ${tab === "common" ? "bg-gray-50 text-primary-700 " : "bg-white text-gray-300"} ${tab === "common" && isOpen ? "border-b-2 border-primary-700" : ""}`}
          onClick={() => setTab("common")}
        >
          위시리스트
        </button>
        <button
          className={`flex-1 cursor-pointer ${tab === "recommend" ? "bg-gray-50 text-primary-700" : "bg-white text-gray-300"} ${tab === "recommend" && isOpen ? "border-b-2 border-primary-700" : ""}`}
          onClick={() => setTab("recommend")}
        >
          추천
        </button>
      </div>

      <div
        className={`w-full overflow-auto transition-[max-height,opacity,transform] duration-300 ${isOpen ? "max-h-[475px] opacity-100 translate-y-0" : "max-h-0 opacity-0 translate-y-4"}`}
      >
        <div className="py-4">
          {tab === "common" ? (
            <>
              {familyWish?.pages.map((item) => {
                const isMenuListSelect = selected?.id === item.id;
                return (
                  <MenuList
                    key={item.id}
                    type="profile"
                    menu={item.title}
                    img={item.imageUrl}
                    isSafe={item.allergyStatus}
                    rate={item.avgScore}
                    category={item.category.label}
                    ingredients={item.ingredientsRaw}
                    profiles={item.sourceProfile.profiles}
                    isSelected={isMenuListSelect}
                    onClick={() =>
                      setSelected({
                        id: item.id,
                        title: item.title,
                        type: item.type,
                      })
                    }
                    clickable={true}
                  />
                );
              })}
            </>
          ) : (
            <>
              {recommendList?.recipes.map((item) => {
                const recipeType = item.transformed
                  ? "TRANSFORMED_RECIPE"
                  : "RECIPE";
                const isMenuListSelect = selected?.id === Number(item.id);
                return (
                  <MenuList
                    key={item.id}
                    type="rate"
                    menu={item.title}
                    img={item.imageUrl}
                    isSafe={item.safe ? "SAFE" : "SAFETY"}
                    rate={item.avgScore}
                    category={item.category}
                    ingredients={item.description}
                    isSelected={isMenuListSelect}
                    onClick={() =>
                      setSelected({
                        id: Number(item.id),
                        title: item.title,
                        type: recipeType,
                      })
                    }
                    clickable={true}
                  />
                );
              })}
            </>
          )}
        </div>
        <div ref={ref} className="h-2"></div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 flex justify-center pb-10">
        <Button
          text={isOpen ? "바꾸기" : "수정완료"}
          type="button"
          onClick={() => {
            if (isOpen) {
              handleChange();
            } else {
              setIsModalOpen(true);
            }
          }}
        />
      </div>
    </div>
  );
}
