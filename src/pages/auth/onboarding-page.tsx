import HomeHeader from "../../components/header/HomeHeader";
import FirstStep from "../../components/onboarding/FirstStep";
import SecondStep from "../../components/onboarding/SecondStep";
import ThirdStep from "../../components/onboarding/ThirdStep";
import { Swiper, SwiperSlide } from "swiper/react";

// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HomeHeader />
      <div className="flex flex-1 items-center px-[16px] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            stopOnLastSlide: true,
          }}
          spaceBetween={16}
          slidesPerView={1}
          className="h-full w-full"
        >
          <SwiperSlide className="pt-[40px] h-full flex items-center">
            <FirstStep />
          </SwiperSlide>
          <SwiperSlide className="pt-[40px] h-full flex items-center">
            <SecondStep />
          </SwiperSlide>
          <SwiperSlide className="pt-[40px] h-full flex items-center">
            <ThirdStep />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
