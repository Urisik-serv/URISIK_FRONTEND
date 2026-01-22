export default function TermDetailList({ content }: { content: string }) {
  return (
    <li className="flex gap-2">
      <span>•</span>
      <span>{content}</span>
    </li>
  );
}
