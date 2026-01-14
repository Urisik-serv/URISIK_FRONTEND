import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import Rate from "../../common/Rate";
import WishlistButton from "../../common/WishlistButton";

const MealCard = () => {
  return (
    <div className="flex justify-between py-4 w-86">
      <img
        src={SampleImg}
        alt="음식 사진"
        className="w-32 h-32 rounded-xl object-cover"
      />
      <div className="flex flex-col items-start gap-1.5 w-49">
        <h2 className="text-zinc-800 text-sm font-semibold leading-5">
          새우대신 고소한 병아리콩 볶음밥!
        </h2>
        <div className="flex justify-start items-center gap-2">
          <p className="text-neutral-400 text-xs font-medium leading-3">양식</p>
          <Rate px={12} rate={4.5} />
        </div>
        <p>새우볶음밥 느낌 그대로, 갑각류 없이도 씹는 맛은 살렸어요.</p>
        <WishlistButton />
      </div>
    </div>
  );
};

export default MealCard;
