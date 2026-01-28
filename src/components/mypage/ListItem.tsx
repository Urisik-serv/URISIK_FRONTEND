import { useNavigate, type To } from "react-router-dom";
import ToggleButton from "./ToggleButton";
import { useState } from "react";
import chevronRight from "../../assets/icons/chevron-right-gray.svg";

interface ListItemProps {
  to?: To;
  isOnOff: boolean;
  title: string;
}

export default function ListItem({ to, isOnOff, title }: ListItemProps) {
  const [isOn, setIsOn] = useState(false);
  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (to) {
      navigate(to);
    }
  };
  return (
    <div>
      {isOnOff ? (
        <div className="w-full h-[42px] px-[20px] py-[16px] rounded-xl flex justify-between items-center bg-gray-100">
          <div className="text-gray-800 text-center text-[16px] font-semibold leading-[24px]">
            {title}
          </div>
          <ToggleButton isOn={isOn} onClick={handleToggle} />
        </div>
      ) : (
        <div className="w-full h-[42px] px-[20px] py-[16px] rounded-xl flex justify-start items-center bg-gray-100 gap-[4px]">
          <button
            onClick={handleNavigate}
            className="cursor-pointer text-gray-800 text-center text-[16px] font-semibold leading-[24px]"
          >
            {title}
          </button>
          <div className="cursor-pointer" onClick={handleNavigate}>
            <img
              className="size-[24px]"
              src={chevronRight}
              alt={`${title} 바로 가기기`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
