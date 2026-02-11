import { Minus } from "../common/icon/Minus";
import { Plus } from "../common/icon/Plus";

interface NumberOfMemberProps {
  number: number;
  increment: () => void;
  decrement: () => void;
  isBlocked: boolean;
}

export default function NumberOfMember({
  number,
  increment,
  decrement,
  isBlocked,
}: NumberOfMemberProps) {
  return (
    <>
      <div className="h-9 px-3 bg-gray-100 rounded-full">
        <div className="z-50 flex justify-center items-center h-full gap-2">
          <button
            onClick={decrement}
            disabled={isBlocked}
            className="flex items-center"
          >
            <Minus />
          </button>
          <div className="bg-white px-3 rounded-full text-center text-primary-700 text-lg font-semibold leading-[28.62px]">
            {number}
          </div>
          <button onClick={increment} className="flex items-center">
            <Plus />
          </button>
        </div>
      </div>
    </>
  );
}
