import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import HeartFull from "../../../assets/icons/heart-full.svg";

const AllergyCard = () => {
  return (
    <div className="py-3 px-2.5 rounded-xl border-2 border-[#ECECEC]">
      <div className="flex justify-between items-center h-32">
        <div className="w-44">
          <div className="pb-4">
            <h1 className="text-zinc-800 text-[15px] font-semibold leading-6 pb-2">
              새우 알레르기 가족원 사이에서 인기있는 버섯 두부 새우탕!
            </h1>
            <p className="text-neutral-500 text-xs font-medium leading-5">
              표고 버섯과 두부피로 새우의 식감을 살린 메뉴로 주목받고 있어요.
            </p>
          </div>
          <div className="flex justify-start gap-0.5">
            <img src={HeartFull} alt="좋아요" />
            <p className="text-neutral-400 text-xs font-semibold leading-4">
              127가구가 선택했어요
            </p>
          </div>
        </div>
        <img
          src={SampleImg}
          alt="음식 이미지"
          className="w-32 h-32 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default AllergyCard;
