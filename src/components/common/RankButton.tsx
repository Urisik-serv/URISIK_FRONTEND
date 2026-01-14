import Up from "../../assets/icons/up-icon.svg";
import Down from "../../assets/icons/down-icon.svg";

interface RankButtonProps {
  rank: number;
  name: string;
  up: boolean;
  onClick?: () => void;
}

const RankButton = ({ rank, name, up, onClick }: RankButtonProps) => {
  return (
    <div className="flex justify-between items-center w-32">
      <div className="flex gap-2 text-zinc-800 text-base font-normal leading-5">
        <p className="font-semibold">{rank}</p>
        <p className="">{name}</p>
      </div>
      <img src={up ? Up : Down} alt={up ? "인기 상승" : "인기 하락"} />
    </div>
  );
};

export default RankButton;
