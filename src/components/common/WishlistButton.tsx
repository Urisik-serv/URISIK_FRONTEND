import HeartOutline from "../../assets/icons/heart-outline-primary.svg";
import Note from "../../assets/icons/note-edit.svg";
import HeartFill from "../../assets/icons/heart-white.svg";

interface WishlistButtonProps {
  isSafe?: boolean;
  isWishList?: boolean;
  onClick?: () => void;
}

const WishlistButton = ({
  isWishList,
  isSafe,
  onClick,
}: WishlistButtonProps) => {
  const buttonStyle =
    "w-full px-2.5 py-4 rounded-xl inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all border border-[1.5px]";
  const activeStyle = isSafe
    ? isWishList
      ? "bg-primary-700 text-white"
      : "bg-white text-primary-700 border-primary-700"
    : "bg-primary-700 text-white border-transparent";
  return (
    <button className={`${buttonStyle} ${activeStyle}`} onClick={onClick}>
      <img
        src={isSafe ? (isWishList ? HeartFill : HeartOutline) : Note}
        alt={isSafe ? "좋아요 아이콘" : "레시피 아이콘"}
        className="w-5 h-5"
      />
      <p className="text-xl font-semibold tracking-tight leading-none">
        {isSafe
          ? `위시리스트 ${isWishList ? "해제" : "추가"}`
          : "우리 가족 버전"}
      </p>
    </button>
  );
};

export default WishlistButton;
