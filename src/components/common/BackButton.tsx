import { useNavigate, type To } from "react-router-dom";
import Chevron from "./icon/Chevron";

interface BackButtonProps {
  to?: number | To;
  className?: string;
  onClick?: () => void;
}

export default function BackButton({
  to = -1,
  className = "",
  onClick,
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
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
      <Chevron color="black" rotate={90} />
    </button>
  );
}
