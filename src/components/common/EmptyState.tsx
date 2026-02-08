import alertImage from "../../assets/images/alert-circle.png";
import SmallButton from "./SmallCommonButton";

interface ElementButtonProps {
  text: string;
  primaryText?: string;
  buttonText?: string;
  onClick?: () => void;
}

const EmptyState = ({
  text,
  primaryText,
  buttonText,
  onClick,
}: ElementButtonProps) => {
  return (
    <div className="flex flex-col h-full items-center text-center">
      <img src={alertImage} alt="알림 아이콘" className="size-[76px] mb-3" />
      <p className="text-[16px] leading-[24px] text-gray-600">{text}</p>
      {primaryText && (
        <p className="font-semibold text-[14px] text-primary-700 pt-5">
          {primaryText}
        </p>
      )}
      {buttonText && (
        <div className="pt-6">
          <SmallButton text={buttonText} type="button" onClick={onClick} />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
