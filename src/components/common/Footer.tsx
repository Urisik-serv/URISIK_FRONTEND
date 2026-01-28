import Background from "../../assets/icons/footer-background.svg";
import Home from "../../assets/icons/home.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Note from "../../assets/icons/note-edit.svg";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 text-[10px] font-medium z-10">
      <div className="relative">
        <img src={Background} className="w-full" alt="푸터 배경" />

        <div className="absolute bottom-0 w-full aspect-[375/92] flex justify-between px-6">
          <div className="flex justify-center w-19 pt-2">
            <button
              className="flex flex-col cursor-pointer gap-2"
              onClick={() => navigate("/")}
            >
              <img src={Home} className="size-5" alt="홈 아이콘" />
              <p>홈</p>
            </button>
          </div>

          <div className="flex flex-col items-center w-19 pt-2">
            <button
              className="flex flex-col items-center cursor-pointer gap-2"
              onClick={() => navigate("/meal-plan")}
            >
              <img src={Calendar} className="size-5" alt="마이 아이콘" />
              <p>식단표</p>
            </button>
          </div>
        </div>

        <button
          className="
            absolute left-1/2 -translate-x-1/2 bottom-[clamp(32px,calc(56/375*100vw),56px)]
            flex flex-col justify-center items-center gap-1 
            w-[clamp(40px,calc(68/375*100vw),68px)]
            h-[clamp(40px,calc(68/375*100vw),68px)] 
            rounded-full bg-primary-700 cursor-pointer"
          onClick={() => navigate("/meal-plan/create")}
        >
          <img src={Note} className="size-6" alt="식단짜기 아이콘" />
          <p className="text-white">식단 짜기</p>
        </button>
      </div>
    </div>
  );
}
