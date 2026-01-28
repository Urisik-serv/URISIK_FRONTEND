import { useNavigate, type To } from "react-router-dom";
import BackIcon from "../../assets/icons/chevron-left.svg";

interface BackButtonProps {
  to?: number | To;
  className?: string;
}

export default function BackButton({
  to = -1,
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof to === "number") {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer size-[24px] shrink-0 ${className}`}
    >
      <img src={BackIcon} alt="뒤로가기" />
    </button>
  );
}
