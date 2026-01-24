import CreamPasta from "../../assets/sample/cream-pasta.png";
import Button from "../common/Button";

export default function TodayMeal() {
  return (
    <>
      <div className="flex justify-between items-center pt-10 pb-6">
        <div>
          <p className="font-normal text-[16px] leading-[1.5]">우유대신,</p>
          <p className="font-semibold text-[18px] tracking-[0.01em]">
            코코넛밀크로 만드는
            <br />
            크림 파스타!
          </p>
        </div>
        <img src={CreamPasta} alt="크림파스타" />
      </div>
      <Button type="button" text="식사 완료" />
      <div className="flex flex-col gap-2 text-[14px] pt-11 pb-7">
        <p className="font-semibold text-primary-700">식재료</p>
        <p className="font-normal text-gray-600">
          바나나 한묶음, 코코넛 밀크 3개, 해바라기 소스 3개, 땅콩 3개, 바나나
          한묶음, 코코넛 밀크 3개
        </p>
      </div>
      <p className="font-semibold text-primary-700 text-[14px] pb-2">레시피</p>
      <div className="flex flex-col gap-4 pb-29">
        {[1, 2, 3, 4].map((n) => (
          <div className="h-full flex justify-between items-center text-[14px] font-semibold">
            <div>
              <div className="flex flex-col gap-[1px] pb-[6px]">
                <p>{n}단계</p>
                <p className=" text-[20px] ">재료손질</p>
              </div>
              <p className="font-normal">
                단계별 설명 설명 설명 설명
                <br />
                단계별 설명 설명 설명 설명
              </p>
            </div>
            <img
              src={CreamPasta}
              alt="크림파스타"
              className="w-36 h-26 shrink-0"
            />
          </div>
        ))}
      </div>
    </>
  );
}
