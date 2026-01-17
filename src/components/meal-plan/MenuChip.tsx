import { useState } from "react";
type MenuChipProps = {
  clickable?: boolean;
};


export default function MenuChip({clickable=false}:MenuChipProps) {
  const [isClick, setIsClick]=useState(false);

  const handleClick=()=>{
    setIsClick((prev)=>!prev);
  }
  
  return (
    <div className={`w-[66px] h-[62px] rounded-xl flex justify-center items-center text-center font-medium text-[14px] whitespace-pre-line 
    ${isClick ? "bg-primary-100 border border-[1.5px] border-primary-700 cursor-pointer" : "bg-[#f6f6f6]"}`}
    onClick={clickable ? handleClick : undefined}
    >
      쌀가루 {"\n"}피자
    </div>
  );
}
