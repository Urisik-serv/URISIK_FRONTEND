interface SafeMarkProps {
  isSafe?: boolean;
}

const SafeMark = ({ isSafe }: SafeMarkProps) => {
  return (
    <p
      className={`text-white text-xs font-semibold leading-4 px-[7px] py-px flex items-center rounded-xl ${isSafe ? "bg-primary-700" : "bg-teal-400"}`}
    >
      {isSafe ? "위험" : "안전"}
    </p>
  );
};

export default SafeMark;
