import { useEffect, useState } from "react";
import PublicHeader from "../../components/header/PublicHeader";
import type { Recipe } from "../../types/recipe-list";
import axios from "axios";
import { useParams } from "react-router-dom";
import SampleImg from "../../assets/sample/shrimp-mushroom.png";
import Rate from "../../components/common/Rate";
import MenuInfo from "../../components/common/MenuInfo";
import UpButton from "../../components/common/UpButton";

const MenuInformationPage = () => {
  const { menuId } = useParams();
  const [data, setData] = useState<Recipe | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/data/recipe-list.json");
        const targetId = Number(menuId);

        const foundData = res.data.recipes.find(
          (item: Recipe) => item.id === targetId,
        );
        setData(foundData);
        console.log(foundData);
      } catch (error) {
        console.log("데이터 로딩 실패: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <PublicHeader title={"메뉴 정보"} />
      <img src={SampleImg} alt={`${data?.title} 사진`} className="h-72" />
      <div className="px-4 pt-8 rounded-t-3xl -mt-10 relative z-10 bg-white">
        <div>
          <h1 className="text-2xl font-semibold pb-3 leading-9 text-gray-800">
            {data?.title}
          </h1>
          <div className="flex justify-start gap-2 pb-12">
            <p className="text-gray-400 text-base font-medium leading-6">
              {data?.category}
            </p>
            <Rate px={16} rate={data?.rating} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-start items-center gap-6">
              <p className="w-13 text-gray-400 text-sm font-medium leading-6">
                조리 시간
              </p>
              <p>{data?.meta.cookingTime}</p>
            </div>
            <div className="flex justify-start items-center gap-6">
              <p className="w-13 text-gray-400 text-sm font-medium leading-6">
                난이도
              </p>
              <p>{data?.meta.difficulty.label}</p>
            </div>
            <div className="flex justify-start items-center gap-6 pb-9">
              <p className="w-13 text-gray-400 text-sm font-medium leading-6">
                맛 포인트
              </p>
              <p>{data?.meta.tastePoint}</p>
            </div>
          </div>
          <div className="pb-12">
            <MenuInfo
              title="어떻게 바뀌었나요?"
              sentences={data?.descriptions}
            />
          </div>
          <div className="pb-5">
            <MenuInfo title="재료" sentences={data?.ingredients} />
          </div>
          <div>
            <MenuInfo title="레시피" sentences={data?.descriptions} />
          </div>
          <UpButton />
        </div>
      </div>
    </div>
  );
};

export default MenuInformationPage;
