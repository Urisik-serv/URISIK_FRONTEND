import crown from "../profile/crown.svg";
interface LeaderProfileProps {
  href: string;
  w?: string;
  h?: string;
}
export default function LeaderProfile({
  href,
  w = "88",
  h = "100",
}: LeaderProfileProps) {
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 88 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image href={crown} x="31" width="26" height="18" />
      <circle
        cx="44"
        cy="56"
        r="39"
        stroke="white"
        strokeWidth="2"
        fill="#f0f0f0"
      />
      <rect
        x="2"
        y="14"
        width="84"
        height="84"
        rx="42"
        stroke="#FF885A"
        strokeWidth="4"
      />
      <defs>
        <clipPath id="circleView">
          <circle cx="44" cy="56" r="39" />
        </clipPath>
      </defs>
      <image
        href={href}
        x="5"
        y="17"
        width="78"
        height="78"
        clipPath="url(#circleView)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  );
}
