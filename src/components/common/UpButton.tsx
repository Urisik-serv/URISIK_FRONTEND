import { useState, useEffect } from "react";
import UpImg from "../../assets/icons/chevron-up.svg";

const UpButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] h-0 z-29 pointer-events-none">
      <div
        className={`
          absolute bottom-32 right-5 transition-opacity duration-200 ease-in-out
          ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <button
          className="cursor-pointer"
          onClick={handleClick}
          tabIndex={isVisible ? 0 : -1}
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
