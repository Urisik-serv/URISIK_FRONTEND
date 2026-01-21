interface MenuInfoProps {
  title: string;
  sentences?: string[];
}

const MenuInfo = ({ title, sentences = [] }: MenuInfoProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-base font-medium text-primary-700 leading-6">
        {title}
      </h1>
      {sentences.map((sentence) => (
        <p className="text-sm font-medium text-gray-800 leading-6">
          {sentence}
        </p>
      ))}
    </div>
  );
};

export default MenuInfo;
