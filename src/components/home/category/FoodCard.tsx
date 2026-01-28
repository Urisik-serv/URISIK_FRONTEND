import Korean from "../../../assets/category/korean.png";
import Japanese from "../../../assets/category/japanese.png";
import Chinese from "../../../assets/category/chinese.png";
import Western from "../../../assets/category/western.png";
import Bunsik from "../../../assets/category/bunsik.png";
import Dessert from "../../../assets/category/dessert.png";

const categoryImages: Record<string, string> = {
  한식: Korean,
  일식: Japanese,
  중식: Chinese,
  양식: Western,
  분식: Bunsik,
  디저트: Dessert,
};

interface FoodCardProps {
  name: string;
}

const FoodCard = ({ name }: FoodCardProps) => {
  const imgSrc = categoryImages[name];
  return (
    <div className="w-20 h-20 px-2 py-2.5 flex flex-col justify-center items-center gap-1 cursor-pointer shrink-0">
      <img className="w-11 h-11 " src={imgSrc} alt={`${name}`} />
      <p className="text-center text-neutral-700 text-base font-semibold leading-6">
        {name}
      </p>
    </div>
  );
};

export default FoodCard;
