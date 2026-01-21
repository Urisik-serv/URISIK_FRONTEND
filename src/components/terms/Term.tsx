interface TermProps {
  title?: string;
  content: React.ReactNode | string;
}

export default function Term({ title, content }: TermProps) {
  return (
    <div className="flex flex-col gap-[8px]">
      {title && (
        <div className="text-primary-700 text-lg font-medium leading-[27px]">
          {title}
        </div>
      )}
      <div className="whitespace-pre-wrap text-[16px] font-medium leading-[24px] text-gray-500">
        {content}
      </div>
    </div>
  );
}
