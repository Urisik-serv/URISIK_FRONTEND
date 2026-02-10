import PageIndicator from "../../common/PageIndicator";
import WhiteHeart from "../../../assets/icons/heart-white.svg";
import SampleImg from "../../../assets/sample/shrimp-mushroom.png";

interface ImageIndicatorProps {
  imgUrl?: string;
  name?: string;
  wishCount?: number;
}

const ImageIndicator = ({ imgUrl, name, wishCount }: ImageIndicatorProps) => {
  return (
    <div className="relative h-72 w-full">
      <img
        src={SampleImg}
        alt={`${name} 사진`}
        className="h-full w-full object-cover shrink-0"
      />
      <div className="absolute bottom-16 left-0 w-full flex justify-end pr-2 z-0">
        <div className="absolute left-1/2 -translate-x-1/2">
          <PageIndicator page={1} total={1} />
        </div>
        <div className="px-2.5 py-2 bg-primary-700 flex justify-start items-center rounded-2xl gap-1">
          <img src={WhiteHeart} alt="좋아요" />
          <p className="text-white font-semibold text-[10px]">
            {wishCount}가구가 선택했어요
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageIndicator;
