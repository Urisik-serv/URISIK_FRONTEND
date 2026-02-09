import Rice from "../../../assets/category/rice.png";
import Soup from "../../../assets/category/soup.png";
import Banchan from "../../../assets/category/banchan.png";
import Dessert from "../../../assets/category/dessert.png";

const categoryImages: Record<string, string> = {
  밥: Rice,
  국: Soup,
  반찬: Banchan,
  후식: Dessert,
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
