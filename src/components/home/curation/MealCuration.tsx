import { useState } from "react";
import MealCard from "./MealCard";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import { useGetRecommendList } from "../../../hooks/queries/use-get-recommendations";
import SelectionModal from "../../common/SelectionModal";
import MenuDown from "../../../assets/icons/menu-down.svg";
import MenuUp from "../../../assets/icons/menu-up.svg";

interface MealCurationProps {
  category: string | undefined;
}
const MealCuration = ({ category }: MealCurationProps) => {
  const [sortType, setSortType] = useState("별점 순");

  const { data } = useGetRecommendList(sortType, category);

  // SelectionModal state
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="pt-8">
      <div className="pb-4">
        <h1 className="text-zinc-800 text-xl font-semibold tracking-tight">
          다음주에 이런 식단은 어떤가요?
        </h1>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          식단에 추가하고 싶은 메뉴를 스크랩해보세요.
        </p>
      </div>
      <div className="flex justify-end">
        <div className="relative">
          <button
            onClick={() => setOpenModal(true)}
            className={`flex items-center justify-between w-full pl-3 pr-2 py-2 gap-1 bg-gray-100 text-base font-medium text-gray-800 hover:text-gray-900 cursor-pointer ${openModal ? "rounded-t-lg" : "rounded-lg"}`}
          >
            <span>{sortType}</span>
            <img
              className="w-4 h-4"
              src={openModal ? MenuUp : MenuDown}
              alt={openModal ? "닫기" : "열기"}
            />
          </button>
        </div>
      </div>
      {data?.recipes.map((recipe) => (
        <MealCard
          key={recipe.id}
          id={recipe.id}
          shortDescription={recipe.description}
          title={recipe.title}
          rating={recipe.avgScore}
          category={recipe.category}
          img={recipe.imageUrl || SampleImg}
          isSafe={recipe.safe}
          external={null}
          type=""
          typeBool={recipe.transformed}
        />
      ))}
      {openModal && (
        <SelectionModal
          handleModal={() => setOpenModal(false)}
          isCheck={sortType}
          bgColor="bg-white"
          borderColor="border-gray-400"
          textColor="text-gray-700"
          firstSelectionOnClick={() => setSortType("별점 순")}
          firstSelectionText="별점 순"
          secondSelectionOnClick={() => setSortType("안전한 순")}
          secondSelectionText="안전한 순"
          thirdSelectionOnClick={() => setSortType("찜 많은 순")}
          thirdSelectionText="찜 많은 순"
          checkIconColor="#9CA3AF"
        />
      )}
    </div>
  );
};

export default MealCuration;
