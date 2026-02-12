import Chevron from "../common/icon/Chevron";

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
  return (
    <div
      className={`flex px-[10px] py-1 rounded-lg text-4 gap-2 ${
        isOpen ? "bg-white" : "bg-gray-200"
      }`}
    >
      {toggleable && (
        <button
          className="size-6 flex justify-center items-center cursor-pointer"
          onClick={setIsOpen}
        >
          {isOpen ? <Chevron rotate={180} /> : <Chevron />}
        </button>
      )}
      <p className="font-semibold text-gray-700 text-[16px]">{title}</p>
      <p className="font-medium text-gray-500 text-[16px]">{date}</p>
    </div>
  );
}
