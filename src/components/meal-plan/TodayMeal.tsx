import { useState } from "react";
// import CreamPasta from "../../assets/sample/cream-pasta.png";
import Button from "../common/Button";
import ReviewModal from "./ReviewModal";
import type { TodayMeal } from "../../types/meal-plan";

export default function TodayMeal({ data }: { data: TodayMeal }) {
  const [isDone, setIsDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(false);
  return (
    <>
      <div className="flex justify-between items-center pt-3 pb-6">
        {isOpen && <ReviewModal onClick={handleOpen} />}
        <div>
          {/* <p className="font-normal text-[16px] leading-[1.5]">우유대신,</p> */}
          <p className="font-semibold text-[18px] tracking-[0.01em]">
            {data.title.split(" ").map((title, idx) => (
              <>
                {title} {idx % 2 === 1 && <br />}
              </>
            ))}
          </p>
        </div>
        <img src={data.imageUrl} alt={`${data.title} 이미지`} />
      </div>
      {!isDone ? (
        <Button
          type="button"
          text="식사 완료"
          onClick={() => setIsDone(true)}
        />
      ) : (
        <Button
          type="button"
          text="리뷰 작성"
          bgColor="white"
          onClick={() => setIsOpen(true)}
        />
      )}

      <div className="flex flex-col gap-2 text-[14px] pt-11 pb-7">
        <p className="font-semibold text-primary-700">
          식재료 <span className="text-gray-600">1인 기준</span>
        </p>
        <p className="font-normal text-gray-600">
          {data.ingredients.split("\n")[1]}
        </p>
      </div>
      <p className="font-semibold text-primary-700 text-[14px] pb-2">레시피</p>
      <div className="flex flex-col gap-4 pb-29">
        {data.instructions.split("\n").map((step) => (
          <div className="h-full flex justify-between items-center text-[14px] font-semibold">
            <div>
              <div className="flex flex-col gap-[1px] pb-[6px]">
                <p>{step[0]}단계</p>
                {/* <p className=" text-[20px] ">재료손질</p> */}
              </div>
              <p className="font-normal">{step.slice(3)}</p>
            </div>
            {/* <img
              src={CreamPasta}
              alt="크림파스타"
              className="w-36 h-26 shrink-0"
            /> */}
          </div>
        ))}
      </div>
    </>
  );
}
