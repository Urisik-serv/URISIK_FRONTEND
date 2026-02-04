import { useState } from "react";
import X from "../../assets/icons/x-icon.svg";
import Button from "../common/Button";
import UnselectedStar from "../../assets/icons/star-unselected.svg";
import SelectedStar from "../../assets/icons/star-selected.svg";

type ReviewModalProps = {
  onClick: () => void;
};

type Preference = "LIKE" | "DISLIKE" | null;

export default function ReviewModal({ onClick }: ReviewModalProps) {
  const [preference, setPreference] = useState<Preference>(null);
  const star = [1, 2, 3, 4, 5];
  const [score, setScore] = useState(0);

  const handlebutton = (select: Preference) => {
    if (select == preference) {
      setPreference(null);
    } else {
      setPreference(select);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end">
      <div className="bg-white rounded-t-2xl shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.25)] w-[375px] z-50 flex flex-col gap-6 items-center text-center">
        <button
          className="pt-[10px] cursor-pointer flex justify-center items-center"
          onClick={onClick}
        >
          <img src={X} alt="닫기버튼" className="size-6" />
        </button>
        <div className="font-semibold">
          <p className="text-[20px] pb-6">오늘의 메뉴는 어떠셨나요</p>
          <div className="pb-4 flex justify-center">
            {star.map((idx) => (
              <button
                className="size-[58px] flex justify-center items-center cursor-pointer"
                key={idx}
                onClick={() => setScore(idx)}
              >
                <img
                  src={idx <= score ? SelectedStar : UnselectedStar}
                  alt="별점"
                />
              </button>
            ))}
          </div>
          <div className="flex justify-center gap-[10px]">
            <button
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === "DISLIKE" ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton("DISLIKE")}
            >
              내 취향은 아니에요
            </button>
            <button
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === "LIKE" ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton("LIKE")}
            >
              또 먹고 싶어요
            </button>
          </div>
        </div>
        <div className="w-full p-[10px] flex justify-center">
          <Button type="button" text="등록" onClick={onClick} />
        </div>
      </div>
    </div>
  );
}
