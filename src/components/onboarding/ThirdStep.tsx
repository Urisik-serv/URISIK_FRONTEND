import { useNavigate } from "react-router-dom";
import layerImg from "../../assets/images/onboarding3.png";
import Button from "../common/Button";

export default function ThirdStep() {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="w-full h-[423px] bg-primary-200 px-[34px] rounded-xl">
          <div className="pt-[28px] text-center text-black text-[17px] font-semibold  leading-7">
            알레르기를 대체 식재료로 제안하여
            <br />
            레시피까지 함께 제공해요.
          </div>
          <div className="pt-[53px] flex justify-center">
            <img src={layerImg} alt="레이어2" />
          </div>
        </div>
        <div className="pt-[20px] flex justify-center gap-[3px]">
          <div className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer" />
          <div className="w-[6px] h-[6px] rounded-full bg-[#E3E3E3] cursor-pointer" />
          <div className="w-[26px] h-[6px] rounded-md bg-[#FF885A]" />
        </div>
        <div className="pt-[50px] pb-8 flex justify-center">
          <Button
            size="Btn_L"
            variant="primary"
            onClick={() => navigate("/agreement")}
            type="button"
            className="w-full"
          >
            <span className="text-xl font-semibold leading-[22px]">시작</span>
          </Button>
        </div>
      </div>
    </>
  );
}
