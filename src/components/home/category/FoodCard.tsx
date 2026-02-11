import Rice from "../../../assets/category/rice.svg";
import Soup from "../../../assets/category/soup.svg";
import Banchan from "../../../assets/category/banchan.svg";
import Dessert from "../../../assets/category/dessert.svg";

const categoryImages: Record<string, string> = {
  밥: Rice,
  국: Soup,
  반찬: Banchan,
  후식: Dessert,
};

interface FoodCardProps {
  name: string;
  onClick: () => void;
  isSelected: boolean;
}

const FoodCard = ({ name, onClick, isSelected }: FoodCardProps) => {
  const imgSrc = categoryImages[name];
  return (
    <div
      className={`px-2.5 py-2.5 flex flex-col justify-center items-center gap-1 cursor-pointer shrink-0 ${isSelected && "border-b-2 border-primary-700"}`}
      onClick={onClick}
    >
      <img className="w-11 h-11 " src={imgSrc} alt={`${name}`} />
      <p className="text-center text-neutral-700 text-base font-semibold leading-6">
        {name}
      </p>
    </div>
  );
};

export default FoodCard;
