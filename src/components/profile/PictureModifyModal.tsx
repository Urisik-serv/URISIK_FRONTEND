interface PictureModalProps {
  onClick: () => void;
}

export default function PictureModifyModal({ onClick }: PictureModalProps) {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/30 flex flex-col items-center justify-end">
        <div className="pb-[26px] w-[353px] flex flex-col items-center gap-[8px]">
          <div className="self-stretch h-40 py-4 bg-[#FF885A] rounded-[10px] outline-none inline-flex flex-col justify-start items-center gap-4">
            <button className="cursor-pointer text-center text-white text-lg font-medium  leading-5">
              앨범에서 사진 선택
            </button>
            <div className="w-[350px] h-0 border-t border-t-[0.60px] border-white"></div>
            <button className="cursor-pointer text-center text-white text-lg font-medium  leading-5">
              사진 촬영
            </button>
            <div className="w-[350px] h-0 border-t border-t-[0.60px] border-white"></div>
            <button className="cursor-pointer text-center text-white text-lg font-medium  leading-5">
              캐릭터 프로필 적용
            </button>
          </div>
          <button
            onClick={onClick}
            className="cursor-pointer self-stretch h-14 px-40 py-4 bg-zinc-100 rounded-[10px] inline-flex justify-center items-center gap-2.5"
          >
            <div className="text-center text-zinc-800 text-lg font-medium  leading-5">
              취소
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
