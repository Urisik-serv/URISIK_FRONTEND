import { useNavigate, type To } from "react-router-dom";
import Chevron from "../common/icon/Chevron";

interface TermsBlockProps {
  title: string;
  to?: To;
}

export default function TermsBlock({ title, to }: TermsBlockProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <>
      <div className="h-[42px] pl-[20px] pr-[8px] flex items-center justify-between relative">
        <div className="text-[16px] font-semibold leading-[24px]">{title}</div>
        <button className="cursor-pointer" onClick={handleNavigate}>
          <Chevron rotate={-90} color="#A1A1AA" />
        </button>
      </div>
    </>
  );
}
