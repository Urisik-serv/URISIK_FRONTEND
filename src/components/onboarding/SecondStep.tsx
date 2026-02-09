import layerImg from "../../assets/images/onboarding2.png";

export default function SecondStep() {
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="w-full h-[423px] bg-primary-200 px-[34px] rounded-xl">
          <div className="pt-[28px] text-center text-black text-[17px] font-semibold  leading-7">
            우리 가족 프로필을 한 번만 설정해 두면
            <br />
            매주 식단표를 자동 생성해줘요
          </div>
          <div className="pt-[53px] flex justify-center">
            <img src={layerImg} alt="레이어2" />
          </div>
        </div>
        <div className="pt-[20px] flex justify-center gap-[3px]">
          <div className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer" />
          <div className="w-[26px] h-[6px] rounded-md bg-[#FF885A]" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer" />
        </div>
      </div>
    </>
  );
}
