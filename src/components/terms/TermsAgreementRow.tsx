import checkBox from "../../assets/icons/check-box.svg";
import emptyCheckBox from "../../assets/icons/check-box-empty.svg";
import { useNavigate, type To } from "react-router-dom";
import Chevron from "../common/icon/Chevron";

interface TermsAgreementRowProps {
  isChecked: boolean;
  onChecked: () => void;
  title: string;
  to: To;
}

export default function TermsAgreementRow({
  isChecked,
  onChecked,
  title,
  to,
}: TermsAgreementRowProps) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <>
      <div className="w-80 inline-flex justify-between items-center pb-[20px]">
        <div className="flex flex-row items-center gap-[4px]">
          <button
            onClick={handleNavigate}
            className="cursor-pointer text-gray-800 text-lg font-medium leading-7"
          >
            {title}
          </button>
          <button onClick={handleNavigate} className="w-6 h-6 cursor-pointer">
            <Chevron rotate={-90} color="#A1A1AA" />
          </button>
        </div>
        <button onClick={onChecked} className="cursor-pointer">
          {isChecked ? (
            <img src={checkBox} alt="checkBox" />
          ) : (
            <img src={emptyCheckBox} alt="emptycheckBox" />
          )}
        </button>
      </div>
    </>
  );
}
