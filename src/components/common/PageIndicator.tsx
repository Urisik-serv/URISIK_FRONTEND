interface PageIndicatorProps {
  page: number;
  total: number;
}

const PageIndicator = ({ page, total }: PageIndicatorProps) => {
  return (
    <div className="inline-flex justify-start items-center gap-[3px]">
      {Array.from({ length: total }).map((_, index) => {
        const isFocused = page === index + 1;
        return (
          <div
            key={index}
            className={`
              h-1.5 rounded-[3px] transition-all duration-300 ease-in-out
              ${isFocused ? "w-6 bg-primary-700" : "w-1.5 bg-neutral-200"}`}
          />
        );
      })}
    </div>
  );
};

export default PageIndicator;
