interface ChevronProps {
  size?: number; // width, height
  color?: string; // fill color
  rotate?: number; // degree
  className?: string; // 추가 스타일용
}

export default function Chevron({
  size = 24,
  color = "#D4D4D8",
  rotate = 0,
  className = "",
}: ChevronProps) {
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
        d="M16.58 8.00016L12 12.5802L7.41 8.00016L6 9.41016L12 15.4102L18 9.41016L16.58 8.00016Z"
        fill={color}
      />
    </svg>
  );
}
