import chevronLeftGray from "../../assets/icons/chevron-right-gray.svg";
import checkBox from "../../assets/icons/Check_box.svg";
import emptyCheckBox from "../../assets/icons/check-box-empty.svg";

interface TermsAgreementRowProps {
  isChecked: boolean;
  onChecked: () => void;
  title: string;
}

export default function TermsAgreementRow({
  isChecked,
  onChecked,
  title,
}: TermsAgreementRowProps) {
  return (
    <>
      <div className="w-80 inline-flex justify-between items-center pb-[20px]">
        <div className="flex flex-row items-center gap-[4px]">
          <div className=" text-gray-800 text-lg font-medium leading-7">
            {title}
          </div>
          <button className="w-6 h-6 cursor-pointer">
            <img
              src={chevronLeftGray}
              alt="서비스 이용 약관 더보기 버튼"
              className="size-[24px]"
            />
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
