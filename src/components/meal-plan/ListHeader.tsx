import Up from "../../assets/icons/chevron-up-gray.svg";
import Down from "../../assets/icons/chevron-down-gray.svg";

type ListHeaderProps = {
  toggleable?: boolean;
  title: string;
  date: string;
  isOpen?: boolean;
  setIsOpen?: () => void;
};

export default function ListHeader({
  toggleable = false,
  title,
  date,
  isOpen = true,
  setIsOpen,
}: ListHeaderProps) {
  const buttonSrc = isOpen ? Up : Down;
  return (
    <div
      className={`flex px-[10px] py-1 rounded-lg text-4 gap-2 ${
        isOpen ? "bg-[#FFF8D5]" : "bg-gray-200"
      }`}
    >
      {toggleable && (
        <button
          className="size-6 flex justify-center items-center cursor-pointer"
          onClick={setIsOpen}
        >
          <img src={buttonSrc} alt="열고 닫기" />
        </button>
      )}
      <p className="font-semibold">{title}</p>
      <p className="font-medium text-gray-600">{date}</p>
    </div>
  );
}
