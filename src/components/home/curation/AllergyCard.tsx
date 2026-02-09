import SampleImg from "../../../assets/sample/shrimp-mushroom.png";
import HeartFull from "../../../assets/icons/heart-full.svg";
import { useNavigate } from "react-router-dom";

interface AllergyCardProps {
  id: string;
  title: string;
  shortDescription: string;
  pickedCount: number;
  img: string;
}

const AllergyCard = ({
  id,
  title,
  shortDescription,
  pickedCount,
  img,
}: AllergyCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/menu-information/${id}`);
  };
  return (
    <div className="py-3 px-2.5 rounded-xl border-2 border-[#ECECEC]">
      <div className="flex justify-between items-center h-32">
        <div className="w-44 h-full flex flex-col justify-between">
          <div className="pb-4" onClick={handleClick}>
            <h1 className="text-zinc-800 text-[15px] font-semibold leading-6 pb-2 cursor-pointer">
              {title}
            </h1>
            <p className="text-neutral-500 text-xs font-medium leading-5 cursor-pointer line-clamp-2">
              {shortDescription}
            </p>
          </div>
          <div className="flex gap-0.5" onClick={handleClick}>
            <img src={HeartFull} alt="좋아요" />
            <p className="text-neutral-400 text-xs font-semibold leading-4">
              {pickedCount}가구가 선택했어요
            </p>
          </div>
        </div>
        <img
          src={img || SampleImg}
          alt="음식 이미지"
          className="w-32 h-32 rounded-lg object-cover cursor-pointer"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default AllergyCard;
