import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview, postTransformReview } from "../api/review";
import { formatYMD } from "../utils/date";
import type { createReview } from "../types/review";

export type review = createReview & { type: "RECIPE" | "TRANSFORMED_RECIPE" };
function usePostReview() {
  const queryClient = useQueryClient();
  const today = formatYMD(new Date());

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

    mutationKey: ["review", today],

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealplan", "today"] });
    },
  });
}

export default usePostReview;
