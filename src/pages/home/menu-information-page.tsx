import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Rate from "../../components/common/Rate";
import MenuInfo from "../../components/common/MenuInfo";
import UpButton from "../../components/common/UpButton";
import WishlistButton from "../../components/common/WishlistButton";
import { getDetailRecipe, postTransRecipe } from "../../api/recipes";
import type { DetailRecipe } from "../../types/recipes";
import { useFamilyStore } from "../../stores/use-family-store";
import usePostWishList from "../../hooks/mutations/use-post-wishlist";
import ImageIndicator from "../../components/home/detailPage/ImageIndicator";

const MenuInformationPage = () => {
  const { menuId } = useParams();
  const [recipe, setRecipe] = useState<DetailRecipe>();

  const navigate = useNavigate();
  const type = new URLSearchParams(useLocation().search).get("type");
  const recipeId = Number(menuId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailRecipe(recipeId);
        console.log("get 요청 성공: ", data);
        setRecipe(data.result);
      } catch (error) {
        console.log("일반 레시피 로딩 실패: ", error);
      }
    };
    fetchData();
  }, []);

  const roomId = useFamilyStore.getState().familyRoomId;
  const { mutate: addWishList } = usePostWishList(roomId);

  const isWishList = recipe?.allergyWarning.hasRisk ? false : true;

  const handleClick = async () => {
    if (isWishList) {
      const currentRecipeId = recipe?.recipeId;

      const directPayload = {
        recipeId: currentRecipeId ? [currentRecipeId] : [],
        transformedRecipeId: [],
      };

      addWishList(directPayload);
    } else {
      const transData = await postTransRecipe(recipeId);
      navigate(
        `/menu-information/${transData.result.transformedRecipeId}?type=TRANSFORMED`,
      );
    }
  };

  return (
    <div>
      <PublicHeader title={"메뉴 정보"} />
      <ImageIndicator
        imgUrl={recipe?.images.small}
        name={recipe?.title}
        wishCount={recipe?.wishCount}
      />

      <div className="px-4 pt-8 rounded-t-3xl -mt-10 relative z-10 bg-white">
        <div>
          <h1 className="text-2xl font-semibold pb-3 leading-9 text-gray-800">
            {recipe?.title}
          </h1>
          <div className="flex justify-start gap-2 pb-10">
            <p className="text-gray-400 text-base font-medium leading-6">
              {recipe?.category}
            </p>
            <Rate px={16} rate={4.5} />
          </div>
          <div className="pb-6">
            <div className="flex gap-1 px-3 py-2.5 bg-gray-50 rounded-lg flex-col">
              <div className="flex flex-row gap-2">
                <p className="text-gray-800 text-[14px] font-medium leading-6">
                  알레르기 위험도
                </p>
                <p
                  className={`text-white text-xs font-semibold leading-4 px-[7px] py-px flex items-center rounded-xl ${recipe?.allergyWarning.hasRisk ? "bg-primary-700" : "bg-teal-400"}`}
                >
                  {recipe?.allergyWarning.hasRisk ? "위험" : "안전"}
                </p>
              </div>
              {recipe?.allergyWarning.hasRisk ?? (
                <p className="text-[13px] text-gray-500 font-medium leading-5">
                  우리가족 버전으로 변경하면, 다른 식재료로 대체됩니다. 다만,
                  원재료와는 맛이 다를 수 있습니다.
                </p>
              )}
            </div>
          </div>
          <div className="pb-5">
            <MenuInfo title="재료" sentences={recipe?.ingredients} />
          </div>
          <div className="pb-20">
            <MenuInfo title="레시피" recipes={recipe?.steps} />
          </div>
          <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 pb-3 z-50 bottom-0">
            <WishlistButton
              onClick={handleClick}
              isSafe={!recipe?.allergyWarning.hasRisk}
            />
          </div>
          <UpButton />
        </div>
      </div>
    </div>
  );
};

export default MenuInformationPage;
