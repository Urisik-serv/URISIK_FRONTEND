import SpeechBubble from "./SpeechBubble";

export interface TempProps {
  generationNumber: number;
}

export const TemperBar = ({ generationNumber }: TempProps) => {
  let widthClass = "w-0";
  let text = "미지근해요";
  let position = "-translate-x-5";
  let bubbleScaleX = 1;

  if (generationNumber < 5) {
    widthClass = "w-[65px]";
    text = "미지근해요";
    position = "-translate-x-5";
    bubbleScaleX = 1;
  } else if (generationNumber < 6) {
    widthClass = "w-[120px]";
    text = "온기가 생기고 있어요";
    bubbleScaleX = 1.15;
    position = "translate-x-8";
  } else if (generationNumber < 10) {
    widthClass = "w-[180px]";
    text = "따뜻해지는 중이에요";
    position = "translate-x-20";
    bubbleScaleX = 1.15;
  } else {
    widthClass = "w-[270px]";
    text = "가족 식탁이 따뜻해졌어요";
    position = "translate-x-43";
    bubbleScaleX = 1.25;
  }

  return (
    <>
      <div className={`flex ${position} w-full`}>
        <SpeechBubble text={text} bubbleScaleX={bubbleScaleX} />
      </div>
      <div className="w-[327px] h-[10px] bg-white rounded-[10px] relative">
        <div
          className={`${widthClass} h-[10px] bg-primary-700 rounded-[10px] absolute top-0`}
        />
      </div>
    </>
  );
};
