import xIcon from "../../assets/icons/x-icon-gray500.svg";
import dropDownButton from "../../assets/icons/chevron-down-gray.svg";
import Button from "../common/Button";
import DateBlock from "./DateBlock";

interface ModalProps {
  handleModal: () => void;
}

export default function GetDateRangeModal({ handleModal }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div className="relative w-full max-w-[375px] h-full flex flex-col justify-end">
        <div className="absolute inset-0 bg-black/50" onClick={handleModal} />

        <div className="relative w-full flex flex-col bg-white py-[17px] px-[16px] rounded-t-3xl">
          <button
            onClick={handleModal}
            className="cursor-pointer flex justify-center pb-[24px]"
          >
            <img src={xIcon} alt="닫기" />
          </button>

          <div className="pb-[24px] text-xl font-semibold">기간 조회</div>

          <div className="w-full p-[12px] flex justify-between items-center border border-gray-300 rounded-lg">
            <span className="text-[16px]">최근 1개월</span>
            <img src={dropDownButton} alt="열기" className="size-[24px]" />
          </div>

          <div className="pt-[16px] flex justify-between gap-[12px]">
            <DateBlock date="2025. 12. 5." />
            <span className="flex items-center text-[18px]">~</span>
            <DateBlock date="2026. 1. 5." />
          </div>

          <div className="pt-[25px]">
            <Button text={"적용"} type="button" onClick={handleModal} />
          </div>
        </div>
      </div>
    </div>
  );
}
