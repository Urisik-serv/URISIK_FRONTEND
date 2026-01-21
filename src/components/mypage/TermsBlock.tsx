import { useNavigate, type To } from "react-router-dom";
import navigateButton from "../../assets/icons/chevron-right-gray.svg";

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
          <img
            src={navigateButton}
            alt={`${title} 상세페이지로 이동`}
            className="size-[24px]"
          />
        </button>
      </div>
    </>
  );
}
