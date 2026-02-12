interface CalendarIconProps {
  size?: number; // width, height
  color?: string; // fill color
  rotate?: number; // 회전 각도
  className?: string; // 추가 스타일
}

export default function CalendarIcon({
  size = 24,
  color = "#52525B",
  rotate = 0,
  className = "",
}: CalendarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={className}
    >
      <path
        d="M19 19H5V8H19M16 1V3H8V1H6V3H5C3.89 3 3 3.89 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 3.89 20.1 3 19 3H18V1"
        fill={color}
      />
    </svg>
  );
}
