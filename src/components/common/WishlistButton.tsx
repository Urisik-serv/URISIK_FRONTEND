import HeartOutline from "../../assets/icons/heart-outline-primary.svg";
import Note from "../../assets/icons/note-edit.svg";

interface WishlistButtonProps {
  isWishList?: boolean;
  onClick?: () => void;
}

const WishlistButton = ({ isWishList, onClick }: WishlistButtonProps) => {
  const buttonStyle =
    "w-full px-2.5 py-4 rounded-xl inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all border border-[1.5px]";
  const activeStyle = isWishList
    ? "bg-white text-primary-700 border-primary-700"
    : "bg-primary-700 text-white border-transparent";
  return (
    <button className={`${buttonStyle} ${activeStyle}`} onClick={onClick}>
      <img
        src={isWishList ? HeartOutline : Note}
        alt={isWishList ? "좋아요 아이콘" : "레시피 아이콘"}
        className="w-5 h-5"
      />
      <p className="text-xl font-semibold tracking-tight">
        {isWishList ? "위시리스트 추가" : "우리 가족 레시피"}
      </p>
    </button>
  );
};

export default WishlistButton;
