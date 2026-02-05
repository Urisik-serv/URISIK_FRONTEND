import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import { useParams } from "react-router-dom";
import WhiteHeart from "../../assets/icons/heart-white.svg";
import Rate from "../../components/common/Rate";
import MenuInfo from "../../components/common/MenuInfo";
import UpButton from "../../components/common/UpButton";
import PageIndicator from "../../components/common/PageIndicator";
import WishlistButton from "../../components/common/WishlistButton";
import { getDetailRecipe } from "../../api/recipes";
import type { DetailRecipe } from "../../types/recipes";

const MenuInformationPage = () => {
  const { menuId } = useParams();
  const [recipe, setRecipe] = useState<DetailRecipe>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeId = Number(menuId);
        const data = await getDetailRecipe(recipeId);
        console.log("get 요청 성공: ", data);
        setRecipe(data.result);
      } catch (error) {
        console.log("데이터 로딩 실패: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <PublicHeader title={"메뉴 정보"} />
      <div className="relative h-72 w-full">
        <img
          src={recipe?.images.small}
          alt={`${recipe?.title} 사진`}
          className="h-full w-full object-cover shrink-0"
        />
        <div className="absolute bottom-16 left-0 w-full flex justify-end pr-2 z-0">
          <div className="absolute left-1/2 -translate-x-1/2">
            <PageIndicator page={1} total={1} />
          </div>
          <div className="px-2.5 py-2 bg-primary-700 flex justify-start items-center rounded-2xl gap-1">
            <img src={WhiteHeart} alt="좋아요" />
            <p className="text-white font-semibold text-[10px]">
              {recipe?.wishCount}가구가 선택했어요
            </p>
          </div>
        </div>
      </div>
      <div className="px-4 pt-8 rounded-t-3xl -mt-10 relative z-10 bg-white">
        <div>
          <h1 className="text-2xl font-semibold pb-3 leading-9 text-gray-800">
            {recipe?.title}
          </h1>
          <div className="flex justify-start gap-2 pb-12">
            <p className="text-gray-400 text-base font-medium leading-6">
              {recipe?.category}
            </p>
            <Rate px={16} rate={4.5} />
          </div>
          <div className="pb-12">
            {/*<MenuInfo
              title="어떻게 바뀌었나요?"
              sentences={recipe?.descriptions}
            />*/}
          </div>
          <div className="pb-5">
            <MenuInfo title="재료" sentences={recipe?.ingredients} />
          </div>
          <div className="pb-20">
            <MenuInfo title="레시피" recipes={recipe?.steps} />
          </div>
          <div className="fixed left-1/2 -translate-x-1/2 w-full max-w-[375px] px-4 pb-3 z-50 bottom-0">
            <WishlistButton isbig={true} />
          </div>
          <UpButton />
        </div>
      </div>
    </div>
  );
};

export default MenuInformationPage;
