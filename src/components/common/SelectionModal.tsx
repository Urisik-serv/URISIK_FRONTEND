import { Check } from "./icon/Check";

export interface SelectionModalProps {
  handleModal?: () => void;
  // 항목별 텍스트
  firstSelectionText: string;
  secondSelectionText: string;
  thirdSelectionText: string;
  // 항목별 onClick함수
  firstSelectionOnClick?: () => void;
  secondSelectionOnClick?: () => void;
  thirdSelectionOnClick?: () => void;
  // 컴포넌트 사용하는 곳에서 각 항목별 클릭 함수에
  // 예:setIsCheck("firstSelection") 추가해 주세요!
  // => 체크 표시에 사용
  isCheck: string;
  // 배경색
  bgColor: string;
  // 체크 아이콘 색
  checkIconColor: string;
  // 테두리 색
  borderColor: string;
  // 텍스트 색
  textColor: string;
}

export default function SelectionModal({
  handleModal,
  firstSelectionOnClick,
  secondSelectionOnClick,
  thirdSelectionOnClick,
  firstSelectionText,
  secondSelectionText,
  thirdSelectionText,
  isCheck,
  bgColor,
  checkIconColor,
  borderColor,
  textColor,
}: SelectionModalProps) {
  return (
    <>
      <div
        onClick={handleModal}
        className="fixed inset-0 z-50 bg-black/30 flex flex-col items-center justify-end"
      >
        <div className="pb-[26px] w-[353px] flex flex-col items-center gap-[8px]">
          <div
            className={`self-stretch h-40 ${bgColor} rounded-[10px] outline-none inline-flex flex-col justify-start overflow-hidden`}
          >
            <button
              onClick={firstSelectionOnClick}
              className={`flex-1 items-center cursor-pointer flex justify-between text-start px-5 w-full  ${textColor} text-lg font-medium  leading-5`}
            >
              <div>{firstSelectionText}</div>
              {isCheck === firstSelectionText && (
                <Check fillColor={checkIconColor} />
              )}
            </button>

            <div
              className={`w-[355px] h-0 border-t-[0.60px] ${borderColor}`}
            ></div>
            <button
              onClick={secondSelectionOnClick}
              className={`flex-1 items-center cursor-pointer flex justify-between text-start px-5 w-full ${textColor} text-lg font-medium  leading-5`}
            >
              <div>{secondSelectionText}</div>
              {isCheck === secondSelectionText && (
                <Check fillColor={checkIconColor} />
              )}
            </button>

            <div
              className={`w-[355px] h-0 border-t-[0.60px] ${borderColor}`}
            ></div>
            <button
              onClick={thirdSelectionOnClick}
              className={`flex-1 items-center cursor-pointer flex justify-between text-start px-5 w-full ${textColor} text-lg font-medium  leading-5`}
            >
              <div>{thirdSelectionText}</div>
              {isCheck === thirdSelectionText && (
                <Check fillColor={checkIconColor} />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
