interface SafeMarkProps {
  isSafe?: boolean;
  isWish?: boolean; // 위시리스트 혹은 식단 수정에서 사용되는지
}

const SafeMark = ({ isSafe, isWish }: SafeMarkProps) => {
  return (
    <>
      {isWish ? (
        <p
          className={`text-white text-[10px] font-semibold leading-4 px-[7px] py-px flex items-center rounded self-stretch shrink-0 ${isSafe ? "bg-teal-400" : "bg-primary-700"}`}
        >
          {isSafe ? "안전" : "위험"}
        </p>
      ) : (
        <p
          className={`text-white text-xs font-semibold leading-4 px-[7px] py-px flex items-center rounded-xl shrink-0 ${isSafe ? "bg-teal-400" : "bg-primary-700"}`}
        >
          {isSafe ? "안전" : "위험"}
        </p>
      )}
    </>
  );
};

export default SafeMark;
