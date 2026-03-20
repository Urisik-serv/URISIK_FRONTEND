import Button from "../common/Button";
import { useEffect, useState } from "react";
import MenuList from "../common/MenuList";
import AlertModal from "../common/AlertModal";
import { useFamilyStore } from "../../stores/use-family-store";
import { useInView } from "react-intersection-observer";
import Chevron from "../common/icon/Chevron";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useInfiniteQuery } from "@tanstack/react-query";
import { wishQueries } from "../../hooks/queries/wish-queries";
import useGetRecommendSafe from "../../hooks/queries/use-get-safe-recipes";

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
export default function BottomSheet({
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
  const { data: recommendList } = useGetRecommendSafe();

  //가족 위시리스트 코드
  const familyRoomId = useFamilyStore.getState().familyRoomId;
  const {
    data: familyWish,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(wishQueries.family(familyRoomId, 6));
  // isPending, isError 등은 나중에...

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  /////////

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
