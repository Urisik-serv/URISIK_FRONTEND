interface ErrorUIProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorUI({
  message = "문제가 발생했습니다.",
  onRetry,
}: ErrorUIProps) {
  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <p className="text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="cursor-pointer px-4 py-2 bg-primary-700 text-white rounded-md"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
