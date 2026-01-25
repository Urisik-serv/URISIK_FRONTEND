interface ToggleButtonProps {
  isOn: boolean;
  onClick: () => void;
}

export default function ToggleButton({ isOn, onClick }: ToggleButtonProps) {
  return (
    <div>
      {isOn ? (
        <button
          onClick={onClick}
          className="cursor-pointer w-[50px] h-[25px] p-[2px] rounded-[14.5px] bg-[#3CDB69] flex items-center"
        >
          <div className="size-[21px] bg-gray-50 rounded-full " />
        </button>
      ) : (
        <button
          onClick={onClick}
          className="cursor-pointer w-[50px] h-[25px] p-[2px] rounded-[14.5px] bg-gray-500 flex justify-end"
        >
          <div className="size-[21px] bg-gray-50 rounded-full " />
        </button>
      )}
    </div>
  );
}
