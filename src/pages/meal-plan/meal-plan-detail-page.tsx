import { useSearchParams } from "react-router-dom";
import PublicHeader from "../../components/header/PublicHeader";

const MealPlanDetailPage = () => {
  const [searchParams] = useSearchParams();
  const menuId = searchParams.get("menuId");
  const type = searchParams.get("type");

  return (
    <div>
      <PublicHeader title={"레시피"} />
    </div>
  );
};

export default MealPlanDetailPage;
