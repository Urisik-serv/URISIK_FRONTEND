import HeartOutline from "../../assets/icons/heart-outline.svg";
import HeartWhite from "../../assets/icons/heart-white.svg";

interface WishlistButtonProps {
  isWishList: boolean;
}

const WishlistButton = ({ isWishList }: WishlistButtonProps) => {
  return (
    <button className="w-48 px-2.5 py-2 bg-primary-700 rounded-xl inline-flex justify-center items-center gap-1 text-white text-sm font-medium cursor-pointer">
      <img src={isWishList ? HeartWhite : HeartOutline} alt="좋아요" />
      위시리스트 {isWishList ? "해제" : "추가"}
    </button>
  );
};

export default WishlistButton;
