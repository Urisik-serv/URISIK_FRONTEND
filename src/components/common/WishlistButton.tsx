import HeartOutline from "../../assets/icons/heart-outline.svg";
import HeartWhite from "../../assets/icons/heart-white.svg";

interface WishlistButtonProps {
  isWishList?: boolean;
  isbig?: boolean;
}

const WishlistButton = ({ isWishList, isbig }: WishlistButtonProps) => {
  const buttonStyle =
    "w-full px-2.5 py-2 bg-primary-700 rounded-xl inline-flex justify-center items-center gap-1 text-white text-sm font-medium cursor-pointer";

  return (
    <button
      className={`${buttonStyle} ${isbig && "py-4 gap-2.5 text-xl font-semibold"}`}
    >
      <img
        src={isWishList ? HeartWhite : HeartOutline}
        alt="좋아요"
        className={`${isbig && "w-5 h-5"}`}
      />
      위시리스트 {isWishList ? "해제" : "추가"}
    </button>
  );
};

export default WishlistButton;
