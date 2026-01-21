import layerImg from "../../assets/images/onboarding1.svg";
import { useSwiper } from "swiper/react";

export default function FirstStep() {
  const swiper = useSwiper();
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="w-full h-[423px] bg-primary-200 px-[34px] rounded-xl">
          <div className="pt-[28px] text-center text-black text-[17px] font-semibold  leading-7">
            알레르기와 선호 음식 등 식단 기호 때문에
            <br />
            가족 식탁이 갈라지는 문제를 해결해요.
          </div>
          <div className="pt-[53px] flex justify-center">
            <img src={layerImg} alt="레이어1" />
          </div>
        </div>
        <div className="pt-[20px] flex justify-center gap-[3px]">
          <div className="w-[26px] h-[6px] rounded-md bg-[#FF885A]" />
          <div
            className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer"
            onClick={() => swiper.slideNext()}
          />
          <div
            className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer"
            onClick={() => swiper.slideTo(2)}
          />
        </div>
      </div>
    </>
  );
}
