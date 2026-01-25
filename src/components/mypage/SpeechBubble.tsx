export default function SpeechBubble({ text }: { text: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="120"
      height="33"
      viewBox="0 0 120 33"
      fill="none"
    >
      <path
        d="M111.542 0C116.213 0 120 4.07577 120 9.10345V17.069C120 22.0967 116.213 26.1724 111.542 26.1724H65.2863L61.3216 33L57.6211 26.1724H8.45815C3.78684 26.1724 0 22.0967 0 17.069V9.10345C1.50486e-05 4.07577 3.78685 0 8.45815 0H111.542Z"
        fill="#FF885A"
      />
      <text
        x="50%"
        y="14"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize="13"
        fontWeight="500"
      >
        {text}
      </text>
    </svg>
  );
}
