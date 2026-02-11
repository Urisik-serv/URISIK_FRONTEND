interface SafeMarkProps {
  isSafe?: boolean;
}

const SafeMark = ({ isSafe }: SafeMarkProps) => {
  return (
    <p
      className={`text-white text-xs font-semibold leading-4 px-[7px] py-px flex items-center rounded-xl ${isSafe ? "bg-teal-400" : "bg-primary-700"}`}
    >
      {isSafe ? "안전" : "위험"}
    </p>
  );
};

export default SafeMark;
