import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview, postTransformReview } from "../../api/review";
import { formatYMD } from "../../utils/date";
import type { createReview } from "../../types/review";
import { queryFactory } from "../queries/query-factory";

export type review = createReview & {
  type: "RECIPE" | "TRANSFORMED_RECIPE";
};
function usePostReview(familyRoomId: number | null) {
  const queryClient = useQueryClient();
  const todayDate = formatYMD(new Date());

  return useMutation({
    mutationFn: ({ recipeId, score, isFavorite, type }: review) => {
      if (type === "RECIPE") {
        return postReview({ recipeId, score, isFavorite });
      } else {
        return postTransformReview({
          transformedRecipeId: recipeId,
          score,
          isFavorite,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryFactory.mealPlan.today(familyRoomId, todayDate),
      });
    },
  });
}

export default usePostReview;
