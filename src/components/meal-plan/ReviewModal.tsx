import { useState } from "react";
import X from "../../assets/icons/x-icon.svg";
import Button from "../common/Button";
import UnselectedStar from "../../assets/icons/star-unselected.svg";
import SelectedStar from "../../assets/icons/star-selected.svg";
import AlertModal from "../common/AlertModal";
import type { createReview } from "../../types/review";
import usePostReview from "../../hooks/mutations/use-post-review";
import toast from "react-hot-toast";
import { useFamilyStore } from "../../stores/use-family-store";

type ReviewModalProps = {
  recipeId: number;
  onClick: () => void;
  type: "TRANSFORMED_RECIPE" | "RECIPE";
};

type Preference = boolean | null;

export default function ReviewModal({
  recipeId,
  onClick,
  type,
}: ReviewModalProps) {
  const [preference, setPreference] = useState<Preference>(null);
  const star = [1, 2, 3, 4, 5];
  const [score, setScore] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handlebutton = (select: Preference) => {
    if (select == preference) {
      setPreference(null);
    } else {
      setPreference(select);
    }
  };

  const onModalClick = () => {
    setIsOpen(false);
    onClick();
  };
  const { familyRoomId } = useFamilyStore.getState();

  const { mutate } = usePostReview(familyRoomId);

  const handleSubmitReview = ({
    recipeId,
    score,
    isFavorite,
  }: createReview) => {
    mutate(
      { recipeId, score, isFavorite, type },
      {
        onSuccess: () => {
          setIsOpen(true);
        },
        onError: (e: any) => {
          if (!score) {
            toast.error("별을 클릭해주세요");
            return;
          }
          toast.error(e.response?.data?.message);
          onClick();
        },
      },
    );
  };
  return (
    <div className="fixed inset-0 z-30 flex justify-center items-end">
      {isOpen && (
        <AlertModal
          boldContent="리뷰 등록 완료!"
          mediumContent={`사용자님의 소중한 리뷰를\n기록했어요.`}
          buttonText="확인"
          onClick={onModalClick}
        />
      )}
      <div className="bg-white rounded-t-2xl shadow-[0_-2px_4px_-2px_rgba(0,0,0,0.25)] w-[400px] flex flex-col gap-6 items-center text-center">
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
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === false ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton(false)}
            >
              내 취향은 아니에요
            </button>
            <button
              className={`px-[10px] py-2 rounded-lg cursor-pointer ${preference === true ? "text-white bg-primary-700" : "text-black bg-[#F0F0F0]"}`}
              onClick={() => handlebutton(true)}
            >
              또 먹고 싶어요
            </button>
          </div>
        </div>
        <div className="w-full p-[10px] flex justify-center">
          <Button
            type="button"
            text="등록"
            onClick={() => {
              const reviewData: createReview = {
                recipeId,
                score,
              };
              if (preference !== null) {
                reviewData.isFavorite = preference;
              }
              handleSubmitReview(reviewData);
            }}
          />
        </div>
      </div>
    </div>
  );
}
