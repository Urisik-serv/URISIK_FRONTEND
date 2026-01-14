import Star from "../../assets/icons/star.svg";

const StarSize: Record<number, string> = {
  12: "w-[12px] h-[12px]",
  16: "w-[16px] h-[16px]",
};
const RatePx: Record<number, string> = {
  12: "text-xs leading-3",
  16: "text-base leading -6",
};

interface RateProps {
  px: number;
  rate: number;
}

const Rate = ({ px, rate }: RateProps) => {
  const starClass = StarSize[px];
  const textClass = RatePx[px] + " text-zinc-400 font-semibold";
  return (
    <div className="flex justify-start gap-0.5 items-center ">
      <img src={Star} alt="평점" className={starClass} />
      <p className={textClass}>{rate}</p>
    </div>
  );
};

export default Rate;
