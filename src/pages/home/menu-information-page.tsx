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
import DetailContent from "../../components/home/detailPage/detailContent";

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
          <DetailContent recipe={recipe} />
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
