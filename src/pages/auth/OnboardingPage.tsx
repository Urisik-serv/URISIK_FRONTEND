import HomeHeader from "../../components/header/HomeHeader";
import FirstStep from "../../components/onboarding/FirstStep";
import SecondStep from "../../components/onboarding/SecondStep";
import ThirdStep from "../../components/onboarding/ThirdStep";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col h-screen">
      <HomeHeader />
      <div className="flex-1 px-[16px] overflow-hidden">
        <Swiper spaceBetween={0} slidesPerView={1} className="h-full w-full">
          <SwiperSlide className="pt-[92px] h-full flex items-center">
            <FirstStep />
          </SwiperSlide>
          <SwiperSlide className="pt-[92px] h-full flex items-center">
            <SecondStep />
          </SwiperSlide>
          <SwiperSlide className="pt-[92px] h-full flex items-center">
            <ThirdStep />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
