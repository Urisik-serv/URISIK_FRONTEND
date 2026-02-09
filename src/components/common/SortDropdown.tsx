import { useState } from "react";
import MenuDown from "../../assets/icons/menu-down.svg";
import MenuUp from "../../assets/icons/menu-up.svg";
import Check from "../../assets/icons/check-gray.svg";

interface SortDropdownProps {
  onSortChange: (sortType: string) => void;
}

const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("별점 순");

  const options = ["별점 순", "안전한 순", "찜 많은 순"];

  const handleSelect = (option: string) => {
    setSelected(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full pl-3 pr-2 py-2 gap-1 bg-gray-100 text-base font-medium text-gray-800 hover:text-gray-900 cursor-pointer ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
      >
        <span>{selected}</span>
        <img
          className="w-4 h-4"
          src={isOpen ? MenuUp : MenuDown}
          alt={isOpen ? "닫기" : "열기"}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute top-full left-0 w-full shadow-lg z-20 bg-gray-100 rounded-b-lg overflow-hidden">
            <div className="flex flex-col py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="flex justify-between items-center w-full pl-3 pr-2 py-2 text-left text-base text-gray-800 hover:bg-gray-200"
                >
                  {option}

                  <img
                    src={Check}
                    alt="체크"
                    className={`w-4 h-4 ${
                      selected === option ? "visible" : "invisible"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
