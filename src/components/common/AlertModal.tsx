interface AlertModalProps {
  title: string;
  boldContent: string;
  mediumContent: string;
  buttonText: string;
  outsideText: "탭해서 취소" | "탭해서 닫기";
  onButtonClick: () => void; //주황색 버튼을 눌렀을 때
  onOutsideClick: () => void; //취소, 닫기 버튼을 눌렀을 때
}

export default function AlertModal({
  title,
  boldContent,
  mediumContent,
  buttonText,
  outsideText,
  onButtonClick,
  onOutsideClick,
}: AlertModalProps) {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 w-[375px] mx-auto flex flex-col justify-center items-center z-10">
        <div className="w-[303px] bg-white pt-[24px] pb-[12px] rounded-xl flex flex-col items-center">
          <div className="text-primary-700 text-lg text-center font-semibold tracking-[0.18px]">
            {title}
          </div>
          <div className="pt-[20px] text-center text-[#333] text-2xl font-semibold leading-[36px] whitespace-pre-line">
            {boldContent}
          </div>
          <div className="text-[#3C3C3C] text-lg leading-[27px] pt-[8px]">
            {mediumContent}
          </div>
          <div className="pt-[48px] w-full px-6">
            <button
              onClick={onButtonClick}
              className="cursor-pointer py-[16px] px-[8px] rounded-xl bg-primary-700 text-white text-xl font-semibold leading-[22px] w-full"
            >
              {buttonText}
            </button>
          </div>
        </div>
        <button
          onClick={onOutsideClick}
          className="cursor-pointer text-white pt-[12px] text-[16px] leading-[24px]"
        >
          {outsideText}
        </button>
      </div>
    </div>
  );
}
