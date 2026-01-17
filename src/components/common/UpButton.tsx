import UpImg from "../../assets/icons/chevron-up.svg";

const UpButton = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] h-0 z-50 pointer-events-none">
      <div className="absolute bottom-32 right-5 pointer-events-auto">
        <button
          className="cursor-pointer pointer-events-auto"
          onClick={handleClick}
        >
          <img
            src={UpImg}
            alt="위로가기 버튼"
            className="border-1 border-gray-400 rounded-2xl bg-white cursor-pointer w-8 h-8 shadow-md"
          />
        </button>
      </div>
    </div>
  );
};

export default UpButton;
