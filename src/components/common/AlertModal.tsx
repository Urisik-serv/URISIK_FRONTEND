interface AlertModalProps {
  title: string;
  boldContent: string;
  mediumContent: string;
  buttonText: string;
  handleModal: () => void;
  onClick: () => void;
}

export default function AlertModal({
  title,
  boldContent,
  mediumContent,
  buttonText,
  handleModal,
  onClick,
}: AlertModalProps) {
  return (
    <div>
      <div className="fixed inset-0 bg-black/50 w-[375px] mx-auto flex flex-col justify-center items-center">
        <div className="w-[303px] bg-white px-[24px] pt-[24px] pb-[12px] rounded-xl flex flex-col items-center">
          <div className="text-primary-700 text-lg text-center font-semibold tracking-[0.18px]">
            {title}
          </div>
          <div className="pt-[20px] text-center text-[#333] text-2xl font-semibold leading-[36px]">
            {boldContent}
          </div>
          <div className="text-[#3C3C3C] text-lg leading-[27px] pt-[8px]">
            {mediumContent}
          </div>
          <div className="pt-[48px] w-full">
            <button
              onClick={onClick}
              className="cursor-pointer py-[16px] px-[8px] rounded-xl bg-primary-700 text-white text-xl font-semibold leading-[22px] w-full"
            >
              {buttonText}
            </button>
          </div>
        </div>
        <button
          onClick={onClick}
          className="cursor-pointer text-white pt-[12px] text-[16px] leading-[24px]"
        >
          탭해서 취소
        </button>
      </div>
    </div>
  );
}
