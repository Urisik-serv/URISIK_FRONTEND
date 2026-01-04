import Background from "../../assets/icons/footer-background.svg";
import Home from "../../assets/icons/home.svg";
import Calendar from "../../assets/icons/calendar.svg";
import Note from "../../assets/icons/note-edit.svg";

export default function Footer() {
  return (
    <div className="fixed bottom-0 text-[10px]">
      <div className="relative">
        <img src={Background} className="w-full" alt="푸터 배경" />

        <div className="absolute bottom-0 w-full aspect-[375/92] flex justify-between px-6 ">
          <div className="flex flex-col items-center gap-1 w-19 pt-2">
            <img src={Home} className="size-5" alt="루틴 아이콘" />
            <p>루틴</p>
          </div>

          <div className="flex flex-col items-center gap-1 w-19 pt-2">
            <img src={Calendar} className="size-5" alt="식단표 아이콘" />
            <p>식단표</p>
          </div>
        </div>

        <div className="absolute bottom-[clamp(32px,calc(56/375*100vw),56px)] w-full flex justify-center">
          <div
            className="flex flex-col justify-center items-center gap-1 
            w-[clamp(40px,calc(68/375*100vw),68px)]
            h-[clamp(40px,calc(68/375*100vw),68px)] 
            rounded-full bg-[#FF885A]"
          >
            <img src={Note} className="size-5" alt="식단짜기 아이콘" />
            <p className="text-white">식단 짜기</p>
          </div>
        </div>
      </div>
    </div>
  );
}
