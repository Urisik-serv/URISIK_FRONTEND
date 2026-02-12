import Up from "../../assets/icons/up-icon.svg";
import Down from "../../assets/icons/down-icon.svg";
import Same from "../../assets/icons/same-icon.svg";

interface RankButtonProps {
  rank: number;
  name: string;
  change: "UP" | "DOWN" | "SAME";
  onClick?: () => void;
}

const RankButton = ({ rank, name, change, onClick }: RankButtonProps) => {
  return (
    <div
      className="flex justify-between items-center w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-2 text-zinc-800 text-base font-normal leading-5 shrink-0">
        <p className="font-semibold">{rank}</p>
        <p className="">{name}</p>
      </div>
      {change === "UP" && <img src={Up} alt="인기 상승" />}
      {change === "DOWN" && <img src={Down} alt="인기 하락" />}
      {change === "SAME" && <img src={Same} alt="인기 유지" />}
    </div>
  );
};

export default RankButton;
