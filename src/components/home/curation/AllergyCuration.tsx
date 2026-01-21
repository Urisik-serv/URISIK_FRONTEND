import { useEffect, useState } from "react";
import PageIndicator from "../../common/PageIndicator";
import AllergyCard from "./AllergyCard";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { FoodList } from "../../../types/recipe-list";
import axios from "axios";

const AllergyCuration = () => {
  // 슬라이드 효과
  const [activePage, setActivePage] = useState(1);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const handlePage = (pageNum: number) => {
    if (swiperRef) {
      swiperRef.slideToLoop(pageNum - 1);
    }
    setActivePage(pageNum);
  };

  // mock data fetching
  const [data, setData] = useState<FoodList | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/recipe-list.json");

        setData(response.data);
      } catch (error) {
        console.log("데이터 로딩 실패: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="pb-4">
        <h2 className="pt-[31px] text-zinc-800 text-xl font-semibold tracking-tight">
          같은 알레르기 가족에게 인기 메뉴
        </h2>
        <p className="text-neutral-400 text-sm font-medium leading-6">
          같은 알레르기를 소유한 가족원들 사이에서 인기가 많아요.
        </p>
      </div>
      {data && (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={(swiper) => setSwiperRef(swiper)}
          onSlideChange={(swiper) => setActivePage(swiper.realIndex + 1)}
          className="pb-2"
        >
          {data?.recipes.map((recipe) => (
            <SwiperSlide>
              <AllergyCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                shortDescription={recipe.shortDescription}
                pickedCount={recipe.pickedCount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-center pt-2">
        <PageIndicator page={activePage} total={3} onClick={handlePage} />
      </div>
    </div>
  );
};

export default AllergyCuration;
