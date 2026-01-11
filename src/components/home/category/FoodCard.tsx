import Korean from "../../../assets/category/korean.png";
import Japanese from "../../../assets/category/japanese.png";
import Chinese from "../../../assets/category/chinese.png";
import Western from "../../../assets/category/western.png";

const categoryImages: Record<string, string> = {
  한식: Korean,
  일식: Japanese,
  중식: Chinese,
  양식: Western,
};

interface FoodCardProps {
  name: string;
}

const FoodCard = ({ name }: FoodCardProps) => {
  const imgSrc = categoryImages[name];
  return (
    <div className="w-11">
      <img src={imgSrc} />
    </div>
  );
};

export default FoodCard;
