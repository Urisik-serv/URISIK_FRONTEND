import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import Rate from "../../common/Rate";
import WishlistButton from "../../common/WishlistButton";

interface MealCardProps {
  id: number;
  title: string;
  shortDescription: string;
  category: string;
  rating: number;
  isWishlisted: boolean;
}
const MealCard = ({
  title,
  shortDescription,
  category,
  rating,
  isWishlisted,
}: MealCardProps) => {
  return (
    <div className="flex justify-between py-4 w-86">
      <img
        src={SampleImg}
        alt="음식 사진"
        className="w-32 h-32 rounded-xl object-cover cursor-pointer"
      />
      <div className="flex flex-col items-start gap-1.5 w-49">
        <h2 className="text-zinc-800 text-sm font-semibold leading-5 cursor-pointer">
          {title}
        </h2>
        <div className="flex justify-start items-center gap-2 cursor-pointer">
          <p className="text-neutral-400 text-xs font-medium leading-3">
            {category}
          </p>
          <Rate px={12} rate={rating} />
        </div>
        <p className="text-zinc-800 text-sm font-normal cursor-pointer">
          {shortDescription}
        </p>
        <WishlistButton isWishList={isWishlisted} />
      </div>
    </div>
  );
};

export default MealCard;
